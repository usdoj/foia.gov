import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

function Continue() {
  const {
    actions, canGoBack, request,
  } = useWizard();

  const { question, answerIdx } = request || {};
  if (!question || typeof answerIdx !== 'number') {
    return null;
  }

  const answer = question.answers[answerIdx];

  return (
    <div>
      <WizardHtml mid={answer.showMid} />

      <p>
        {canGoBack && (
          <button
            type="button"
            className="usa-button"
            onClick={actions.prevPage}
          >
            Back
          </button>
        )}
        <button
          type="button"
          className="usa-button"
          onClick={actions.nextPage}
        >
          Continue
        </button>
      </p>
    </div>
  );
}

export default Continue;
