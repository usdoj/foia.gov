# foia-api

beta.foia.gov leverages a decoupled architecture with a static web app
making requests to [foia-api](https://github.com/usdoj/foia-api),
a Drupal-based back end repository. The API used by the front stage is the same
API that can be leveraged by the public and is documented on our [developer
page](https://beta.foia.gov/developer/).


## API environments

Similar to the front stage, there are three environments for the API:
`development`, `staging`, and `production`. You can configure which back stage to
use with the `APP_ENV` environment variable. By default, it's set to
`development`.

    $ APP_ENV=staging make serve

Additionally, if you have foia-api setup locally, you can use `APP_ENV=local` to
develop both the back stage and front stage locally on your development machine.


## api.data.gov integration

We use [api.data.gov](https://api.data.gov/about/), a free API management
service for federal agencies. api.data.gov sits in front of the back end and
manages rate limiting and API keys. Admins can refer to [this
document](https://docs.google.com/document/d/1TlNBg44N4J2AOBK00Mo5MGl37ZweTeEQ1pYJzUpOegA/edit#)
for details on how we’ve configured api.data.gov for our application. Refer to
the [api.data.gov manual](https://github.com/18F/api.data.gov/wiki/User-Manual:-Agencies)
for general configuration.

The front stage has dedicated embedded API keys. This allows us to treat the
front stage as an API consumer with special rate limiting. Each environment
(development, staging, production) has a unique embedded API key. These API keys
are not secrets, since they must be sent to the browser for the static web
application to work with the API. If we move the app to a dynamic back end, we
can re-evaluate how the API keys are managed. The API keys live in the
environment specific [settings directory](../js/settings).

All environments are configured the same with one exception. The `dev`
environment is configured without requiring an API key to make debugging
a little easier.
