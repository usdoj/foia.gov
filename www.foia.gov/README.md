# www.foia.gov

This is a mirror of [www.foia.gov](https://www.foia.gov/) as of 24 July 2017.

There have been small modifications made to the original HTML and JS
to make all links relative, and to proxy backend requests through
the `foia-proxy.php` script, which points at the original site.

The main pages have been migrated to [Jekyll](https://jekyllrb.com/) so that we
can develop the look and feel of the Portal in tandem with the entire site.


## Authentication

The Basic Auth functionality is present during pre-ATO process. Team members
should request the username/passphrase from their teammates.

The user and password is specified in the `.htpasswd` as a hash which is created
at deploy time via CI/CD. Create the `.htpasswd` file at the root of the site
directory:

    $ htpasswd -c -b .htpasswd theusername thepassword


## Testing

    $ make test

We do html linting on the built site. We exclude the existing foia.gov content
through `.htmlprooferignore`. If you make significant modifications to the
html, you should remove that file from the ignore list so that it can be linted.

In addition to linting, as a sanity check, we check that we don't make any
accidental modifications to the existing content. These are called the "canary"
tests. A copy of the built site exists in `_www.foia.gov-canary`. We compare the
build directory `_site` to the files in `_www.foia.gov-canary`, ignoring any
files in `.canaryignore`. Any differences will fail the test with output like
this.

```
Files _site/index.html and _www.foia.gov-canary/index.html differ
Makefile:11: recipe for target 'test' failed
make: *** [test] Error 1
```

You should then diff the files to inspect what the difference is.

    $ diff -u _www.foia.gov-canary/index.html _site/index.html
    # (or you can run the tests in verbose mode)
    $ make DEBUG=1 test

If the change was unintentional, fix it so there are no differences between your
build and the canary. If the change was intentional, update the canary by
copying the build file to the canary directory.

In the initial part of the build phase, it's assumed we shouldn't be modifying the
foia.gov content very often so the canary sanity check is useful. As we ramp up
development and start affecting styles globally, this sanity check is less
useful and we can remove it at that point for better tests.


## Deployment

This project is deployed automatically through [continuous
integration](https://circleci.com/gh/18F/beta.foia.gov) (CI) as a static
application to [Acquia Cloud](https://cloud.acquia.com/). Any changes merged to
the `master` branch will be vetted by our automated tests and then deployed
automatically.

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


## Reporting API and foia-proxy

To run this site locally on a Mac, you need to:

* enable a web server configured to handle PHP
* point the web server at the root of this directory

On a Mac, Apache with PHP support is typically already installed,
but may need to be configured. You should verify that this line:

    LoadModule php5_module libexec/apache2/libphp5.so

is not commented out in `/etc/apache2/httpd.conf`. Once that line
is enabled, you can start Apache with:

    % apachectl start

Then, you should create a symlink to wherever you have
this repository checked out.

    % ln -s path/to/your/repo /Library/WebServer/Documents/www.foia.gov

And then your site should be available at http://localhost/www.foia.gov
