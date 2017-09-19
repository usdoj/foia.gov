# Redirects

This directory contains [cf-redirect](https://github.com/18F/cf-redirect) apps. We've setup a redirect for open.foia.gov.
Because the domain is no longer supported, we redirect to www.foia.gov.

To deploy the app on cloud.gov:

    $ cf target -o doj-foia-discovery -s staging
    $ cf target -f redirects/open.foia.gov/manifest.yml
