# www.foia.gov

This is a mirror of [www.foia.gov](https://www.foia.gov/) as of 24 July 2017.

There have been small modifications made to the original HTML and JS
to make all links relative, and to proxy backend requests through
the foia-proxy.php script, which points at the original site.


## Authentication

The Basic Auth functionality is present during pre-ATO process. Team members
should request the username/passphrase from their teammates.

The user and password is specified in the `.htpasswd` as a hash which is created
at deploy time via CI/CD. Create the `.htpasswd` file at the root of the site
directory:

    $ htpasswd -c -b .htpasswd theusername thepassword


## Deployment

This project is deployed automatically through continuous integration (CI) as
a static application to [cloud.gov](https://cloud.gov/). Any changes merged to
the `master` branch will be vetted by our automated tests and then deployed
automatically.

To provide Basic Auth, the `.htpasswd` file is created at deploy time using
`bin/gen_htpasswd.sh`. You must set the environment variable `$HTPASSWD` to the
user/hash in your CI system. We use [CircleCI](https://circleci.com/gh/18F/foia).


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
