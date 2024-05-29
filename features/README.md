# End-to-end Tests

## About the testing framework
- The framework used for e2e tests in this project is Cucumber-mink: https://cucumber-mink.js.org/.
- Additional reference: https://cucumber.io/docs/cucumber/api/?lang=javascript

## Running tests locally
When running the `.feature` tests locally, the API must be made available to the front end:
1. In one terminal window/tab, start the foia-api (`ddev start` or equivalent)
2. In another tab, start the foia.gov front-end in development mode: (`make serve.dev` or `npm run serve:dev`)
3. In another tab, launch the tests:
  - To run all `.feature` tests, run `npx cucumber-js`
  - To run specific `.feature` tests, run `npx cucumber-js features/AgencySearch.feature features/Wizard.feature` etc.
  - The `--fail-fast` flag can be appended to make the test suite exit at any failure rather than attempting to complete the entire batch.

### Additional Notes
- When debugging tests, the browser automation can be switched to non-headless mode by adding `headless: false`, to the Mink config in `features/support/mink.js`.
- The entire test suite may take ~10 min to complete.
