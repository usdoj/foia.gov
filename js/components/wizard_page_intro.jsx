import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import WizardHtml from './wizard_html';

function Intro() {
  const { actions, introReady } = useWizard();

  return (
    <PageTemplate>
      <Constrain>
        <h1>Search Introduction</h1>

        {!introReady && (
          <WizardHtml mid="loading" />
        )}

        {introReady && (
          <div className="w-component-intro">
            <WizardHtml mid="intro_slide" />

            <Button onClick={actions.nextPage}>
              Begin
            </Button>
          </div>
        )}
      </Constrain>
    </PageTemplate>
  );
}

export default Intro;
