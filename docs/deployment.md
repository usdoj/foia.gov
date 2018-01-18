# Deployment

This project is deployed automatically through [continuous
integration](https://circleci.com/gh/18F/beta.foia.gov) (CI) as a static
application to [Acquia Cloud](https://cloud.acquia.com/). Any changes merged to
the `develop`, `master`, and `release-*` branches will be vetted by our automated
tests and then deployed automatically. We use
[CircleCI](https://circleci.com/docs/) for our CI solution.

In the [CI settings](https://circleci.com/gh/usdoj/foia.gov/edit#env-vars),
you must configure the Acquia Cloud git repo as `GIT_REPO`. The CI config runs
`bin/git-deploy.sh _site <environment>` which pushes the build files in `_site`
to the named environment in Acquia Cloud.

To authorize CI, you must also [add an SSH key to
CI](https://circleci.com/gh/usdoj/foia.gov/edit#ssh), and the public key in
your [Acquia Cloud account](https://cloud.acquia.com/app/profile/ssh-keys).

For a deploy, CI first does a local build, then runs the tests.
If the tests pass, a new environment specific build is preformed. If the build
is successful, it is deployed to the named environment.

Each environment is deployed separately based on the name of the git branch.

| environment | hostname | git |
| ---         | ---      | --- |
| development | [dev-www.foia.gov](https://dev-www.foia.gov/) | `develop` branch |
| staging | [stg-www.foia.gov](https://stg-www.foia.gov/) | `release-*` branches |
| production | [beta.foia.gov](https://beta.foia.gov/) | `master` branches |

_Note: once DOJ's ATO is complete, the beta.foia.gov domain will be moved to
www.foia.gov._

## How to deploy to development

Deploying to development is done via the merging of a pull request into the "develop" branch. So, in order to deploy something to the [development server](https://dev-www.foia.gov) there first needs to be a pull request created. Once that is done, go to the pull request and click the green "Merge pull request" button.

This kicks off the development "build" process, which is managed by CircleCI. Roughly, the change should be deployed to [development](https://dev-www.foia.gov) in about 5 minutes.

## How to deploy to staging

Deploying to staging is done via the creation of a branch that starts with "release-". The convention is to use a date in YYYYMMDD form, such as `release-20171117`. To do this in Github, follow these steps:

1. Go to the [repository's main page](https://github.com/usdoj/foia.gov).
2. Click the dropdown that says "Branch: develop".
3. Type in the name of the new branch, such as `release-20171117`.
4. Because the branch does not already exist in the dropdown, Github will give you the option of creating it. Eg, "Create branch release-20171117 from develop".

This kicks off the staging "build" process, which is managed by CircleCI. Roughly, the change should be deployed to [staging](https://stg-www.foia.gov) in about 5 minutes.

## How to deploy to production

TBD (but basically this will involve creating a pull request to merge a release-* branch into the master branch.
