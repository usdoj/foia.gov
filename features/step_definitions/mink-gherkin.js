const cucumber = require('@cucumber/cucumber');
const mink = require('cucumber-mink');
const Promise = require('bluebird');

const customSteps = [
  {
    pattern: /^(?:|I )enter "([^"]*)" into the homepage agency search box/,
    callback: async function(value) {
      const inputSelector = this.mink.getSelector('the homepage search box');
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      await Promise.delay(1 * 1000);
      await inputHandle.press('Enter');
      await Promise.delay(1 * 1000);
      return inputHandle.dispose();
    }
  },
  {
    pattern: /^(?:|I )enter "([^"]*)" into the annual report agency search box/,
    callback: async function (value) {
      const inputSelector = this.mink.getSelector('the annual report search box');
      const inputHandle = await this.mink.page.$(inputSelector);
      await inputHandle.type(value);
      await Promise.delay(1 * 1000);
      await inputHandle.press('Enter');
      await Promise.delay(1 * 1000);
      return inputHandle.dispose();
    }
  },
  {
    pattern: /^(?:|I )check the year "([^"]*)"/,
    callback: async function (value) {
      const inputSelector = 'input[name="' + value + '"]';
      return this.mink.page.$eval(inputSelector, el => {
        el.checked = true;
      });
    }
  }
];
customSteps.forEach(function(step) {
  cucumber.defineStep(step.pattern, step.callback);
})

mink.gherkin(cucumber);