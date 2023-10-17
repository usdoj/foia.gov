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
    "the agency search box": "#agency-search",
    "the annual report search box": "#agency-component-search-1",
    "the A-to-Z button": "button[aria-controls='a1']",
    "the A button": "button[aria-controls='A']",
    "the last item in the A section": "#A li:last-child span",
    "the start request button": ".start-request",
    "the first agency suggestion": ".foia-component-card:first-of-type",
    "the first radio option": "input[type='radio']:first-of-type",
    "the View Report button": "button[value='view']",
    "the data type dropdown": "select[name='data_type']",
    "the Select All Agencies button": ".select-all-agencies > a",
    "the Hero image credit": "a[href='https://commons.wikimedia.org/wiki/File:Usdepartmentofjustice.jpg']",
    "the justice.gov link": "a[href='http://www.justice.gov']",
    "the external link script": "script[src='/assets/js/extlink.min.js']",
    "the wizard primary button": "button.w-component-button.usa-button.usa-button-primary-alt.usa-button-big",
    "the Tax records topic button": "div.w-component-pill-group > ul > li:nth-child(2) > button",
    "the wizard query box": "textarea.w-component-form-item__element",
    "external link card": "a.foia-component-card.foia-component-card--alt.foia-component-card--ext"
  }
});

// Avoid timeout issues.
cucumber.setDefaultTimeout(60 * 1000);

driver.hook(cucumber);
