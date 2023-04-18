import React, { useContext } from 'react';
import { WizardCtx } from './wizard_pages';

function Two() {
  const { callApi, loading } = useContext(WizardCtx);
  return (
    <div>
      <h1>Page Two</h1>

      <p>
        <button type="button" className="usa-button" onClick={callApi}>Continue</button>
        {loading && ' Loading...'}
      </p>
    </div>
  );
}

export default Two;
