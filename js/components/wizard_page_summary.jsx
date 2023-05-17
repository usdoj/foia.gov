import React from 'react';
import { useWizard } from '../stores/wizard_store';

function Summary() {
  const {
    actions,
    request,
    canGoBack,
  } = useWizard();

  return (
    <div>
      <p>Your query:</p>

      <blockquote>
        {request.query}
      </blockquote>

      <pre>{JSON.stringify(request, null, 2)}</pre>

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
          onClick={actions.reset}
        >
          Reset
        </button>
      </p>
    </div>
  );
}

export default Summary;
