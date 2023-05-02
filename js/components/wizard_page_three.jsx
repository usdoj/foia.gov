import React from 'react';
import { useWizard } from '../stores/wizard_store';

function Three() {
  const { actions, ui, request } = useWizard();

  if (!request) {
    return <p>Error: Request not set</p>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: ui.intro3 || '' }} />

      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(request, null, 2)}</pre>

      <button type="button" onClick={actions.reset}>Restart</button>
    </div>
  );
}

export default Three;
