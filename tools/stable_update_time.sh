#!/usr/bin/env bash
set -euo pipefail

gitIsClean() {
    local file=$1
    local output=$(git status --porcelain=v2 "$file")
    [[ -z "$output" ]]
}

gitMtime() {
    local file=$1
    if gitIsClean "$file"; then
        touch -d @0$(git log --pretty=%at -n1 -- "$file") "$file"
    fi
}

shopt -s globstar
for f in $(git rev-parse --show-toplevel)/source/_posts/**/*; do
    gitMtime "$f"
done
