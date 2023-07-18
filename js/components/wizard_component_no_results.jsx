import React from 'react';
import Button from './wizard_component_button';
import { useWizard } from '../stores/wizard_store';
import Heading from './wizard_component_heading';
import BodyText from './wizard_component_body_text';
import RichText from './wizard_component_rich_text';

function NoResults() {
  const { actions } = useWizard();

  return (
    <div>
      <Heading tag="h2">Sorry. We were unable to match your request with an agency or document.</Heading>
      <BodyText>Here are some suggestions for refining your search:</BodyText>

      <RichText>
        <ol>
          <li>If your initial search was broad, try using more narrow terms.</li>
          <li>If your initial search was narrow, try broadening your search term.</li>
          <li>Try using a different phrase or another word to describe what you are seeking.</li>
        </ol>

        <p style={{ fontSize: '24px' }}>
          <span style={{ marginRight: '3rem' }}>
            <Button onClick={actions.jumpBackToQueryPage}>
              Update your search
            </Button>
          </span>
          <a href="/agency-search.html">Browse the list of agencies</a>
        </p>
      </RichText>
    </div>
  );
}

export default NoResults;
