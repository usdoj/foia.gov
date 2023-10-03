import React from 'react';
import { useWizard } from '../stores/wizard_store';
import Button from './wizard_component_button';

function MoreResults() {
  const { actions } = useWizard();
  return (
    <div>
      <Button onClick={actions.switchToModelResults}>
        <div className="wizard-button-switch-to-model">
          I’m looking for something else,
          <br />
          {' '}
          show me more results.
        </div>
      </Button>
    </div>
  );
}

export default MoreResults;
