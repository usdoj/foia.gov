# Linting

To check our content and code, we use
[linting](https://en.wikipedia.org/wiki/Lint_(software)). Linting is run
automatically through continuous integration (CI). You can run it locally, too.

    $ make test

We do html linting on the built site. Some of the legacy files are
[excluded](https://github.com/18F/beta.foia.gov/blob/develop/.htmlprooferignore)
from linting through `.htmlprooferignore`. If you make significant modifications
to the one of these legacy pages, you should remove that file from the ignore
list so that it can be linted and any issues can be corrected.

For javascript code, we use [eslint](https://eslint.org/).
