import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import Constrain from './wizard_layout_constrain';
import WizardHtml from './wizard_html';

function Summary() {
  const { actions, activity, request } = useWizard();

  if (activity.type !== 'summary') {
    throw new Error('Not a summary activity');
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          {typeof activity.titleMid === 'string' ? (
            // Topic/answer-specific content
            <WizardHtml mid={activity.titleMid} />
          ) : (
            // Show agencies & links from model
            <>
              <p>Your request:</p>
              <blockquote>
                {request.query}
              </blockquote>

              <pre>{JSON.stringify(request.agencies, null, 2)}</pre>
              <pre>{JSON.stringify(request.links, null, 2)}</pre>
            </>
          )}
        </RichText>

        <Button onClick={actions.reset}>
          Reset
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Summary;
