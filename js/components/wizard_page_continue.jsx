import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';

function Continue() {
  const {
    actions, activity, displayedTopic, request,
  } = useWizard();

  if (activity.type !== 'continue') {
    throw new Error('Activity is not continue');
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          {activity.displayedTopic || displayedTopic ? (
            <>
              <h1><WizardHtml mid="youSelected" /></h1>
              <blockquote>
                &ldquo;
                {activity.displayedTopic || displayedTopic}
                &rdquo;
              </blockquote>
            </>
          ) : (
            <>
              <h1><WizardHtml mid="lookingFor" /></h1>
              <blockquote>
                &ldquo;
                {request.query || request.topic.title}
                &rdquo;
              </blockquote>
            </>
          )}
        </RichText>

        <WizardHtml mid={activity.titleMid} />

        <Button onClick={actions.nextPage}>
          Continue
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Continue;
