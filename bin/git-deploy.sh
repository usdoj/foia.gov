#!/bin/bash

set -o errexit
set -o pipefail
set -x

deploy_dir=deploy
docroot_dir=docroot
destination_repo="$GIT_REPO"
build_dir=${1}
target=${2}


if [[ -z "$GIT_REPO" ]]; then
  echo 'You must specify $GIT_REPO in your environment.' >&2
  exit 1
fi

if [ -z "$build_dir" ] || [ -z "$target" ]; then
  echo "Usage: $0 <build_dir> <target_branch>" >&2
  exit 1
fi

# Working directory
rm -rf "$deploy_dir"
mkdir "$deploy_dir"
cd "$deploy_dir"

# Git init
git --version
git init
git config user.name "CI deploy script"
git config user.email "aaron.borden+foia-deploy@gsa.gov"
git remote add origin "$destination_repo"
git fetch --depth 1 origin
git checkout "$target"
rm -rf "$docroot_dir"

# Copy build files
mv "../$build_dir" "$docroot_dir"
git add .
git commit -m "CI deploy to Acquia Cloud"
# Force push from the current repo's master branch to the remote
# repo's target branch. (All previous history on the target branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
echo git push --quiet "$destination_repo" ${target} > /dev/null 2>&1
