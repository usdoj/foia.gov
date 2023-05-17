// Included for tsc
// eslint-disable-next-line no-unused-vars
import React from 'react';

import Init from './wizard_page_init';
import Question from './wizard_page_question';
import Continue from './wizard_page_continue';
import Summary from './wizard_page_summary';
import TopicIntro from './wizard_page_topicintro';

const wizardPages = {
  Init,
  Question,
  Continue,
  Summary,
  TopicIntro,
};

/**
 * @enum {string}
 */
export const WizardPageName = {
  Init: 'Init',
  Question: 'Question',
  Continue: 'Continue',
  Summary: 'Summary',
  TopicIntro: 'TopicIntro',
};

export default wizardPages;
