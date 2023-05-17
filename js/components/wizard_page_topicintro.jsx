import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

function TopicIntro() {
  const {
    actions, canGoBack, request,
  } = useWizard();

  const { userTopic } = request || {};
  if (!userTopic || !userTopic.introMid) {
    return null;
  }

  return (
    <div>
      <WizardHtml mid={userTopic.introMid} />

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

export default TopicIntro;
