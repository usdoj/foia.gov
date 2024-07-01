import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import Button from './wizard_component_button';
import FeedbackRadioSet from './wizard_component_feedback_radio';
import FormItem from './wizard_component_form_item';
import RichText from './wizard_component_rich_text';
import WizardHtml from './wizard_html';
import Constrain from './wizard_layout_constrain';
import PageTemplate from './wizard_template_page';
import QuestionHead from './wizard_layout_question_head';
import Inline from './wizard_layout_inline';
import QuestionText from './wizard_component_question';

function UserFeedback() {
  const { actions, feedbackErrorMessages } = useWizard();

  const [meetsExpectations, setMeetsExpectations] = useState(
    /** @type number|null */ null,
  );
  const [relevanceToSearch, setRelevanceToSearch] = useState(
    /** @type number|null */ null,
  );
  const [otherFeedback, setOtherFeedback] = useState(
    /** @type string */ '',
  );
  const [submitted, setSubmitted] = useState(/** @type boolean */ false);

  const options = () => [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
    {
      label: '5',
      value: 5,
    },
  ];

  function handleSubmit() {
    setSubmitted(true);
    actions.submitFeedback(meetsExpectations, relevanceToSearch, otherFeedback);
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <QuestionHead>
            <h1>Search Feedback</h1>
            <Inline largeGap>
              <QuestionText>
                <WizardHtml mid="literal:Will you answer a few questions to help us improve?" />
              </QuestionText>
              <div className="w-component-skip-button-container">
                <Button
                  className="w-component-skip-button"
                  onClick={() => actions.toLastSteps(false)}
                  // don't show "leave feedback" option on the next screen
                >
                  Skip
                </Button>
              </div>
            </Inline>
          </QuestionHead>
          <form className="w-component-feedback">
            <fieldset>
              <QuestionText isSubQuestion>
                How well do these results meet your expectations?
              </QuestionText>
              <FeedbackRadioSet
                name="meets-expectations"
                prefix="Not at all"
                suffix="Very Well"
                options={options('expectations')}
                onChange={(e) => {
                  actions.clearFeedbackErrors();
                  setSubmitted(false);
                  setMeetsExpectations(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <QuestionText isSubQuestion>
                How relevant were the results to your search?
              </QuestionText>
              <FeedbackRadioSet
                name="relevance-to-search"
                prefix="Not Relevant"
                suffix="Very Relevant"
                options={options('relevance')}
                onChange={(e) => {
                  actions.clearFeedbackErrors();
                  setSubmitted(false);
                  setRelevanceToSearch(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <QuestionText isSubQuestion>
                Please explain your answers or provide any other feedback.
              </QuestionText>
              <FormItem
                type="textarea"
                name="other-feedback"
                labelHtml="other-feedback"
                isLabelHidden
                value={otherFeedback}
                maxLength={2000}
                onChange={(e) => {
                  actions.clearFeedbackErrors();
                  setSubmitted(false);
                  setOtherFeedback(e.target.value);
                }}
              />
              {otherFeedback.length > 1800 && !submitted && (
                <div className="w-component-max-length-message-container">
                  <p className="w-component-max-length-message">
                    {2000 - otherFeedback.length}
                    /2000
                  </p>
                </div>
              )}
            </fieldset>
            {feedbackErrorMessages
              && Object.keys(feedbackErrorMessages).map((key) => (
                <div
                  key={key}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: feedbackErrorMessages[key] }}
                />
              ))}
            <Button
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </RichText>
      </Constrain>
    </PageTemplate>
  );
}

export default UserFeedback;
