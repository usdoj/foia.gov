import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import Button from './wizard_component_button';
import FormItem from './wizard_component_form_item';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import RichText from './wizard_component_rich_text';

function UserFeedback() {
  const { actions } = useWizard();

  const [meetsExpectations, setMeetsExpectations] = useState(
    /** @type number|null */ null,
  );
  const [relevanceToSearch, setRelevanceToSearch] = useState(
    /** @type number|null */ null,
  );
  const [otherFeedback, setOtherFeedback] = useState(
    /** @type string */ '',
  );

  const options = [
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
    actions.submitFeedback(meetsExpectations, relevanceToSearch, otherFeedback);
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <h1>
            <WizardHtml mid="literal:Will you answer a few questions to help us improve?" />
          </h1>
          <div className="w-component-skip-button-container">
            <Button
              className="w-component-skip-button"
              onClick={() => actions.toLastSteps(false)}
              // don't show "leave feedback" option on the next screen
            >
              Skip
            </Button>
          </div>
          <form className="w-component-feedback">
            <fieldset>
              <legend className="w-feedback-legend">
                How well do these results meet your expectations?
              </legend>
              <div className="w-component-feedback-option-set">
                {options.map(({ label, value }) => (
                  <FormItem
                    type="radio"
                    name="meets-expectations"
                    key={label}
                    labelHtml={label}
                    value={value}
                    onChange={(e) => setMeetsExpectations(e.target.value)}
                  />
                ))}
              </div>
              <div className="w-component-option-annotation">
                <p>Not at all</p>
                <p>Very Well</p>
              </div>
            </fieldset>
            <fieldset>
              <legend className="w-feedback-legend">
                How relevant were the results to your search?
              </legend>
              <div className="w-component-feedback-option-set">
                {options.map(({ label, value }) => (
                  <FormItem
                    type="radio"
                    name="relevance-to-search"
                    key={label}
                    labelHtml={label}
                    value={value}
                    onChange={(e) => setRelevanceToSearch(e.target.value)}
                  />
                ))}
              </div>
              <div className="w-component-option-annotation">
                <p>Not Relevant</p>
                <p>Very Relevant</p>
              </div>
            </fieldset>
            <fieldset>
              <legend className="w-feedback-legend">
                Please explain your answers or provide any other feedback.
              </legend>
              <FormItem
                type="textarea"
                name="other-feedback"
                labelHtml="other-feedback"
                isLabelHidden
                value={otherFeedback}
                onChange={(e) => setOtherFeedback(e.target.value)}
              />
            </fieldset>
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
