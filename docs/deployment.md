# Deployment

This project is deployed automatically through [continuous
integration](https://circleci.com/gh/18F/beta.foia.gov) (CI) as a static
application to [Acquia Cloud](https://cloud.acquia.com/). Any changes merged to
the `develop`, `master`, and staging branches will be vetted by our automated
tests and then deployed automatically.

In the [CI settings](https://circleci.com/gh/18F/beta.foia.gov/edit#env-vars),
you must configure the Acquia Cloud git repo as `$GIT_REPO`. The CI config runs
`bin/git-deploy.sh _site <environment>` which pushes the build files in `_site`
to the named environment in Acquia Cloud.

To authorize CI, you must also [add an SSH key to
CI](https://circleci.com/gh/18F/beta.foia.gov/edit#ssh), and the public key in
your [Acquia Cloud account](https://cloud.acquia.com/app/profile/ssh-keys).

For a deploy, CI first does a local build, then runs the tests.
If the tests pass, a new environment specific build is preformed. If the build
is successful, it is deployed to the named environment.

Each environment is deployed separately based on the git configuration based on
[Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/).

| environment | hostname | git |
| ---         | ---      | --- |
| development | [dev-www.foia.gov](https://dev-www.foia.gov/) | `develop` branch |
| staging | [stg-www.foia.gov](https://stg-www.foia.gov/) | `release-*` branches |
| production | [beta.foia.gov](https://beta.foia.gov/) | `master` branches |

_Note: once DOJ's ATO is complete, the beta.foia.gov domain will be moved to
www.foia.gov._


