import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';

function Continue() {
  const { actions, activity } = useWizard();

  if (activity.type !== 'continue') {
    throw new Error('Activity is not continue');
  }

  return (
    <PageTemplate>
      <Constrain>
        <WizardHtml mid={activity.titleMid} />

        <Button onClick={actions.nextPage}>
          Continue
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Continue;
