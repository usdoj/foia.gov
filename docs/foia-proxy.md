# foia-proxy

This site was created from a web scrape of [www.foia.gov](https://www.foia.gov/)
as of 24 July 2017.

There have been small modifications made to the original HTML and JS to make all
links relative, and to proxy back end requests through the
[foia-proxy.php](https://github.com/18F/beta.foia.gov/blob/develop/www.foia.gov/foia-proxy.php)
script, which points at the original site, now at
[archive.foia.gov](https://archive.foia.gov/).

Most of the legacy pages have been migrated to [Jekyll](https://jekyllrb.com/) so that they
can use the same header, footer, and visual design of the Portal.


## Reporting back end and foia-proxy

The reporting back end provided by the legacy www.foia.gov is still in use. We need
to proxy requests to it, maintaining session cookies. We've created
a transparent proxy at
[foia-proxy.php](/18F/beta.foia.gov/blob/master/www.foia.gov/foia-proxy.php) to
accomplish this.

Because Jekyll does not handle PHP code, this proxy must be run on a PHP-enabled
web server like Apache. We've created a [vagrant virtual
machine](https://www.vagrantup.com/) specifically for this. The vagrant VM is
not needed for general development, only for testing the interactions with the
reporting back end on the legacy pages.

Refer to [www.vagrantup.com](https://www.vagrantup.com/) for getting vagrant
installed.

To run the VM:

    $ vagrant up

And open your web browser to [localhost:8080](http://localhost:8080/).

If you need to debug anything or check the logs, you can connect to the VM over
ssh:

    $ vagrant ssh

To stop the VM:

    $ vagrant halt
