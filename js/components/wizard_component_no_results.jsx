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
      </RichText>

      <RichText>
        <Button onClick={actions.jumpBackToQueryPage}>Update your search</Button>
        <a href="/agency-search.html" style={{ textDecoration: 'underline' }}>Browse the list of agencies</a>
      </RichText>
    </div>
  );
}

export default NoResults;
