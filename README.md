[![CircleCI](https://circleci.com/gh/18F/beta.foia.gov.svg?style=svg)](https://circleci.com/gh/18F/beta.foia.gov)

# foia

New FOIA beta site + national portal. The site is based off of
[18F recommendations](https://github.com/18F/foia-recommendations) from our
discovery sprint with the Department of Justice.


## Content


### Web content

Site content lives in the markdown pages under the [www.foia.gov
directory](/18F/beta.foia.gov/tree/develop/www.foia.gov).

[Glossary terms](/18F/beta.foia.gov/tree/develop/www.foia.gov/_glossary_terms)
should be edited in markdown, one term per file.


### FOIA request forms

Individual agency FOIA request forms live in the [back
stage][foia-back-stage] an are owned by OIP. However, the per-section
help text (blue box content) can be edited [one section per-file in
markdown](/18F/beta.foia.gov/tree/develop/www.foia.gov/api/_request_form_sections).
The files should be numbered so they appear in the correct order.


### Agency contact information

Contact information lives in the [back stage][foia-back-stage] but this
information should be updated individually by agency FOIA personnel.


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


[foia-back-stage]: https://admin.foia.gov/
