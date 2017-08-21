# Javascript build

The javascript build uses Webpack to build javascript bundles and outputs them
to the Jekyll source dir (`www.foia.gov/assets/js/`). Jekyll treats them as
plain old javascript files and will copy them to the Jekyll build directory
(`_site/`) to be deployed.

## Development

This will start the Jekyll server and webpack in watch mode.

    $ make serve

## Tests

The test files are compiled via `mocha-webpack` and then run with mocha.
