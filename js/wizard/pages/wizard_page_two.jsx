import React from 'react';
import { useWizard } from '../../stores/wizard_store';

function Two() {
  const {
    actions, ui,
  } = useWizard();

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: ui.intro2 || '' }} />

      <p>
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

export default Two;
