#!/bin/bash

set -o errexit
set -o pipefail
set -x

cloud_gov=${CF_API:-https://api.fr.cloud.gov}

app=${1}
org=${2}
space=${3}
manifest=${4:-manifest.yml}

if [[ -z $org || -z $space || -z $app ]]; then
  echo "Usage: $0  <app> <org> <space> [manifest.yml]" >&2
  exit 1
fi

cf api "$cloud_gov"

(
  set +x # Disable debugging

  # Log in if necessary
  if [[ -n $CF_DEPLOY_USER && -n $CF_DEPLOY_PASSWORD ]]; then
    cf auth "$CF_DEPLOY_USER" "$CF_DEPLOY_PASSWORD"
  fi
)

# Target space
cf target -o "$org" -s "$space"

# If the app exists, use zero-downtime
if cf app "$app"; then
  command=zero-downtime-push
else
  command=push
fi

# Deploy web-app
cf "$command" "$app" -f "$manifest"
