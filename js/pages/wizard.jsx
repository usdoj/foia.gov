import React, { useEffect } from 'react';
import wizardPages from '../components/wizard_pages';
import { useWizard } from '../stores/wizard_store';
import AppContainer from '../components/wizard_layout_app_container';

function WizardPage() {
  // Start loading UI stuff...
  const { page, actions } = useWizard();

  useEffect(() => {
    actions.initLoad();
  }, []);

  const ActivePageComponent = wizardPages[page];

  return (
    <AppContainer>
      <ActivePageComponent />
    </AppContainer>
  );
}

WizardPage.propTypes = {};

export default WizardPage;
