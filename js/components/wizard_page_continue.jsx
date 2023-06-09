import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';

function Continue() {
  const { actions, request } = useWizard();

  const { question, answerIdx } = request || {};
  if (!question || typeof answerIdx !== 'number') {
    return null;
  }

  const answer = question.answers[answerIdx];

  return (
    <PageTemplate>
      <Constrain>
        <WizardHtml mid={answer.showMid} />

        <Button onClick={actions.nextPage}>
          Continue
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Continue;
