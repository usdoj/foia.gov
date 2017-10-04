#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

htpasswd_path=${1:-.htpasswd}
echo "$HTPASSWD" > "$htpasswd_path"
