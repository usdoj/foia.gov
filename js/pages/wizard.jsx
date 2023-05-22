import React, { useEffect } from 'react';
import wizardPages from '../components/wizard_pages';
import { useWizard } from '../stores/wizard_store';

function WizardPage() {
  // Start loading UI stuff...
  const { page, actions } = useWizard();

  useEffect(() => {
    actions.initLoad();
  }, []);

  const ActivePageComponent = wizardPages[page];

  return (
    <div className="usa-grid usa-section-dark">
      <div className="usa-width-one-whole">
        <ActivePageComponent />
      </div>
    </div>
  );
}

WizardPage.propTypes = {};

export default WizardPage;
