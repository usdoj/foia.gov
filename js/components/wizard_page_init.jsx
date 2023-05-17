import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

function Init() {
  const {
    actions, allTopics, ready, loading,
  } = useWizard();

  if (!ready || !allTopics) {
    return (
      <div>Loading app...</div>
    );
  }

  return (
    <div>
      <WizardHtml mid="intro1" />

      <p>
        <button
          type="button"
          className="usa-button"
          onClick={() => actions.submitRequest({
            query: 'I am interested in med records.',
            topic: allTopics[0],
          })}
        >
          Continue
        </button>
        {loading && ' Loading...'}
      </p>
    </div>
  );
}

export default Init;
