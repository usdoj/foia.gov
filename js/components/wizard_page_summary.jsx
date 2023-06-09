import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import Constrain from './wizard_layout_constrain';

function Summary() {
  const {
    actions,
    request,
  } = useWizard();

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <p>Your query:</p>

          <blockquote>
            {request.query}
          </blockquote>

          <pre>{JSON.stringify(request, null, 2)}</pre>
        </RichText>

        <Button
          size="big"
          isButtonElement
          onClick={actions.reset}
        >
          Reset
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Summary;
