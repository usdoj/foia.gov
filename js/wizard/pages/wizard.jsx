import React from 'react';
import wizardPages from '../components/wizard_pages';
import { useRawWizardStore, useWizard } from '../../stores/wizard_store';

function WizardPage() {
  // Start loading UI stuff...
  useWizard().actions.initLoad();

  const page = useRawWizardStore((state) => state.page);
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

WizardPage.defaultProps = {};

export default WizardPage;
