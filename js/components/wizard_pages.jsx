// Included for tsc
// eslint-disable-next-line no-unused-vars
import React from 'react';

import Intro from './wizard_page_intro';
import Query from './wizard_page_query';
import Question from './wizard_page_question';
import Continue from './wizard_page_continue';
import Summary from './wizard_page_summary';

const wizardPages = {
  intro: Intro,
  query: Query,
  question: Question,
  continue: Continue,
  summary: Summary,
};

export default wizardPages;
