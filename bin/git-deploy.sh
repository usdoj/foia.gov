#!/bin/bash

set -o errexit
set -o pipefail

deploy_dir=deploy
docroot_dir=docroot
destination_repo="foiafront@svn-23659.prod.hosting.acquia.com:foiafront.git"
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

# Trust Acquia Cloud ssh servers
cat - <<EOF >> ~/.ssh/known_hosts
|1|pbwPrEpGRhczUeYTnv4TQeLd9o4=|Xg8WLpvNgV48Zph/TMjAjIsW2+g= ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPLqLvcodOBGuAyMJcMdl2NLB6xguovOAGoqGtQUCOxIbOQUz5WU5rJW1VVtM8L4CL907v07MoC+Xu6uULHwywompFX4f+dEe8Ej/J0SNLn1CxT0GuqcpckPWVyfCsKGoBofi39EMwWgLHL6A5yK9mAzJvXqvFEp69ioKl7oMTzLYcrhqGzXrbeKkqTqY3ls5LCCV3vfPJ0E5hy/zO4gCxo8/Cl40dF3ERyxyYhFYGRVmPVcQg2UIV+a+OLW2RLWX4e/cWD2tEkHrIn+Mog8mXQCcYceI1UQdNShC0cc1/3diNL8GID3qjWPR8XIPl4uhxviHi4sSqbNkGVuCeWKY1
EOF

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
git commit --allow-empty -m "CI deploy to Acquia Cloud"
# Force push from the current repo's master branch to the remote
# repo's target branch. (All previous history on the target branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --quiet "$destination_repo" "$target" > /dev/null 2>&1 || ( echo Error: git push failed >&2 ; exit 1 )

# If we're here, everything is ok.
echo Deploy success.
