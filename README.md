[![CircleCI](https://circleci.com/gh/18F/foia.svg?style=svg)](https://circleci.com/gh/18F/foia)

# foia

New FOIA beta site + national portal. The site is based off of
[18F recommendations](https://github.com/18F/foia-recommendations) from our
discovery sprint with the Department of Justice.


## Development


### Prerequisites

* [Ruby](https://www.ruby-lang.org/en/) 2.3.4
* [Bundler](https://bundler.io/)

You can use [rvm](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv) to manage
multiple Ruby versions.

Once you've got Ruby installed, install bundler.

    $ gem install bundler


### Setup

Install the dependencies.

    $ bundle install
    $ npm install

Build the site.

    $ make build

Run the tests.

    $ make test

Run the site locally.

    $ make serve

And open your browser to http://localhost:4000/.

See more in the [README.md](www.foia.gov/README.md).

To build for production, set the `NODE_ENV` environment variable.

    $ NODE_ENV=production make build
