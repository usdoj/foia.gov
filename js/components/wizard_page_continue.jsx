import React from 'react';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import MoreResults from './wizard_component_more_results';

function Continue() {
  const {
    actions, activity, canSwitchToModelResults, displayedTopic, request,
  } = useWizard();

  if (activity.type !== 'continue') {
    throw new Error('Activity is not continue');
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <h1><WizardHtml mid="lookingFor" /></h1>
          <blockquote>
            &ldquo;
            {displayedTopic || request.query}
            &rdquo;
          </blockquote>
          <h2><WizardHtml mid="soundsGood" /></h2>
        </RichText>

        <WizardHtml mid={activity.titleMid} />

        <Button onClick={actions.nextPage}>
          Continue
        </Button>
        {canSwitchToModelResults && <MoreResults />}
      </Constrain>
    </PageTemplate>
  );
}

export default Continue;
