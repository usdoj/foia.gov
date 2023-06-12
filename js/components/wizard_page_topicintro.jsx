import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Button from './wizard_component_button';
import Constrain from './wizard_layout_constrain';

function TopicIntro() {
  const { actions, request } = useWizard();

  const { userTopic } = request || {};
  if (!userTopic || !userTopic.introMid) {
    return null;
  }

  return (
    <PageTemplate>
      <Constrain>
        <WizardHtml mid={userTopic.introMid} />

        <Button
          onClick={actions.nextPage}
        >
          Continue
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default TopicIntro;
