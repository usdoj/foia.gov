#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

IGNORE_HREFS=$(ruby -e 'puts %w{
  \/chief-foia-officers-council
}.map{|h| "/#{h}/"}.join(",")')

# Run htmlproofer with an ignore list of files
bundle exec htmlproofer _site --check-html --disable-external --file-ignore $(paste -sd, .htmlprooferignore) --url-ignore $IGNORE_HREFS $@
