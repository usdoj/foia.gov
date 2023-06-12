// Included for tsc
// eslint-disable-next-line no-unused-vars
import React from 'react';

import Intro from './wizard_page_intro';
import Query from './wizard_page_query';
import Question from './wizard_page_question';
import Continue from './wizard_page_continue';
import Summary from './wizard_page_summary';
import TopicIntro from './wizard_page_topicintro';

const wizardPages = {
  Intro,
  Query,
  Question,
  Continue,
  Summary,
  TopicIntro,
};

/**
 * @enum {string}
 */
export const WizardPageName = {
  Intro: 'Intro',
  Query: 'Query',
  Question: 'Question',
  Continue: 'Continue',
  Summary: 'Summary',
  TopicIntro: 'TopicIntro',
};

export default wizardPages;
