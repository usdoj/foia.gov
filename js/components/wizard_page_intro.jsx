import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import RichText from './wizard_component_rich_text';
import Button from './wizard_component_button';
import WizardHtml from './wizard_html';

function Intro() {
  const {
    actions, ready,
  } = useWizard();

  if (!ready) {
    return <div>Loading app...</div>;
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <WizardHtml mid="intro0" />
        </RichText>

        <Button
          size="big"
          isButtonElement
          onClick={actions.nextPage}
        >
          Begin
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Intro;
