This is a mirror of www.foia.gov as of 24 July 2017.

There have been small modifications made to the original HTML and JS
to make all links relative, and to proxy backend requests through
the foia-proxy.php script, which points at the original site.

The Basic Auth functionality is present during pre-ATO process.

To create the .htpasswd file, use:

 % htpasswd -c -b .htpasswd theusername thepassword

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

