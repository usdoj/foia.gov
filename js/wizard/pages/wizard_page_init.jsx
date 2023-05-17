import React from 'react';
import { useWizard } from '../../stores/wizard_store';

function Init() {
  const {
    actions, allTopics, ready, loading, ui,
  } = useWizard();

  if (!ready) {
    return (
      <div>Loading app...</div>
    );
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: ui.intro1 || '' }} />

      <p>
        <button
          type="button"
          className="usa-button"
          onClick={() => actions.submitRequest({
            query: 'user input here...',
            topics: [allTopics[0]],
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
