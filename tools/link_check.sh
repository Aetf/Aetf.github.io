#!/usr/bin/env bash
set -euo pipefail

TEMPDIR=$(mktemp -d)

# make sure all children are killed
function cleanup() {
    rm -rf "$TEMPDIR"
    kill "$NODE_PID"
}

trap 'exit_code=$? && cleanup && exit $exit_code' SIGINT SIGTERM EXIT

# start server in background
echo '::group::Waiting server'
npm run serve &
NODE_PID=$!

# download linkcheck while the server starting
RELEASE_DATA=$(curl -s https://api.github.com/repos/filiph/linkcheck/releases/latest)
LINKCHECK_TAR_XZ=$(printf "%s" "$RELEASE_DATA" | jq -r '.assets | map(select(.name | test("linux.*x64")))[0].browser_download_url')
curl -sJL "$LINKCHECK_TAR_XZ" | tar -C "$TEMPDIR" -xz
LINKCHECK=$TEMPDIR/linkcheck/linkcheck

timeout 15 bash -c 'until echo > /dev/tcp/localhost/4000; do sleep 0.5; done' 2>/dev/null
echo '::endgroup::'

# redo the check to avoid transient errors
function retry {
    local n=1
    local max=5
    echo "::group::Link Check (Attempt $n/$max)"
    while true; do
    "$@" && break || {
        exit_code=$?
        echo '::endgroup::'
        if [[ $n -lt $max ]]; then
            ((n++))
            echo "::warning::Command failed."
            echo "::group::Link Check (Attempt $n/$max)"
        else
            echo "::error::The command has failed after $n attempts."
            exit $exit_code
        fi
    }
    done
    echo '::endgroup::'
}

# A crawl of ~5900 links hits a couple of hundred external hosts in a few seconds, and from
# GitHub Actions runners some of them intermittently refuse the connection outright. hexo.io —
# linked from the theme footer on *every* page — is the usual victim; letsencrypt.org and
# mosharaf.com show up too. Those are not broken links: they resolve fine from elsewhere, and a
# plain re-run often passes. The retry loop above can't absorb it either, since all 5 attempts
# land inside the same ~45s window.
#
# So: demote connection failures to warnings, and treat a warnings-only run as a pass. linkcheck
# exits 2 when it found errors, 1 when it only found warnings, 0 when clean. Real HTTP errors
# (404, 403, 500) stay errors and still fail the build, which is what the check is actually for.
function link_check {
    local code=0
    "$LINKCHECK" -e --no-check-anchors --connection-failures-as-warnings \
        --skip-file tools/link_check_skip.txt :4000 || code=$?
    if [[ $code -eq 1 ]]; then
        echo "::warning::Link check reported warnings only, treating as pass."
        return 0
    fi
    return $code
}

retry link_check
