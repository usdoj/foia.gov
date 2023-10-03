import React from 'react';
import { useWizard } from '../stores/wizard_store';

function MoreResults() {
  const { actions } = useWizard();
  return (
    <div>
      <button onClick={actions.switchToModelResults} className="wizard-button-switch-to-model">
        I’m looking for something else,
        <br />
        {' '}
        show me more results.
      </button>
    </div>
  );
}

export default MoreResults;
