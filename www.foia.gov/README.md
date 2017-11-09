# www.foia.gov

This is a mirror of [www.foia.gov](https://www.foia.gov/) as of 24 July 2017.

There have been small modifications made to the original HTML and JS
to make all links relative, and to proxy backend requests through
the `foia-proxy.php` script, which points at the original site.

The main pages have been migrated to [Jekyll](https://jekyllrb.com/) so that we
can develop the look and feel of the Portal in tandem with the entire site.


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
