#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

# Run htmlproofer with an ignore list of files
bundle exec htmlproofer _site --check-html --disable-external --file-ignore $(paste -sd, .htmlprooferignore)
