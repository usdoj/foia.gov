const cucumber = require('@cucumber/cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://localhost:4000',
  viewport: {
    width: 1366,
    height: 768,
  },
  selectors: {
    "homepage search button": ".usa-search-submit-text",
    "the homepage search box": "#search-field-big",
    "the annual report search box": "#agency-component-search-1",
    "the A-to-Z button": "button[aria-controls='a1']",
    "the A button": "button[aria-controls='A']",
    "the last item in the A section": "#A li:last-child span",
    "the start request button": ".start-request",
    "the first agency suggestion": ".tt-suggestion:first-child",
    "the View Report button": "button[value='view']",
    "the data type dropdown": "select[name='data_type']",
    "the Select All Agencies button": ".select-all-agencies > a",
  }
});

// Avoid timeout issues.
cucumber.setDefaultTimeout(60 * 1000);

driver.hook(cucumber);