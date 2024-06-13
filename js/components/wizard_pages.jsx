// Included for tsc
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Continue from './wizard_page_continue';
import UserFeedback from './wizard_page_feedback';
import Intro from './wizard_page_intro';
import LastSteps from './wizard_page_last_steps';
import Query from './wizard_page_query';
import Question from './wizard_page_question';
import Summary from './wizard_page_summary';

const wizardPages = {
  intro: Intro,
  query: Query,
  question: Question,
  continue: Continue,
  summary: Summary,
  feedback: UserFeedback,
  lastSteps: LastSteps,
};

export default wizardPages;
