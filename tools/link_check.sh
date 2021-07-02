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

retry "$LINKCHECK" -e --no-check-anchors --skip-file tools/link_check_skip.txt :4000
