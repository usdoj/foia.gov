# Development


## Prerequisites

* [Ruby](https://www.ruby-lang.org/en/) 2.3.4
* [Bundler](https://bundler.io/)

You can use [rvm](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv) to manage
multiple Ruby versions.

Once you've got Ruby installed, install bundler.

    $ gem install bundler


## Setup

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

To build for production, set the `NODE_ENV` and `APP_ENV` environment variables.

    $ NODE_ENV=production APP_ENV=production make build
