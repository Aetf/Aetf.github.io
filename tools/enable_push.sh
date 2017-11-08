#! /bin/sh
git submodule update --init

add_push() {
    local repo=$1
    local push_url=$2
    pushd $repo >/dev/null
    echo "Entering $repo"
    origin=$(git remote get-url origin)
    origin="git@github.com:${origin##'https://github.com/'}"
    git remote set-url --push origin $origin
    git checkout master
    popd >/dev/null
}

add_push themes/next
