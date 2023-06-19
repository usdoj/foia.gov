import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import WizardHtml from './wizard_html';

function Intro() {
  const { actions, ready } = useWizard();

  return (
    <PageTemplate>
      <Constrain>
        {!ready && (
          <WizardHtml mid="loading" />
        )}

        {ready && (
          <>
            <WizardHtml mid="intro_slide" />

            <Button onClick={actions.nextPage}>
              Begin
            </Button>
          </>
        )}
      </Constrain>
    </PageTemplate>
  );
}

export default Intro;
