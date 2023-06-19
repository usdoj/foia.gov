import React from 'react';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import Constrain from './wizard_layout_constrain';
import WizardHtml from './wizard_html';
import FormItem from './wizard_component_form_item';

function Summary() {
  const { actions, activity, request } = useWizard();
  const { agencies, links } = request;

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
              <p>We did a quick search for:</p>
              <blockquote>
                &ldquo;
                {request.query}
                &ldquo;
              </blockquote>

              { (!links || links.length === 0) && (!agencies || agencies.length === 0) ? (
                <WizardHtml mid="polydeltaNoResults" />
              ) : (
                null
              )}
              {links && links.length > 0 ? (
                <>
                  <h2>We found the following public information:</h2>
                  <WizardLinks links={links} />
                </>
              ) : (
                null
              )}
              {agencies && agencies.length > 0 ? (
                <>
                  <h2>The following agencies may have the records you seek.</h2>
                  <p>Click each agency to learn more or to submit a FOIA request.</p>
                  <WizardAgencies agencies={agencies} />
                </>
              ) : (
                null
              )}

              <h2>Can we help you with anything else?</h2>
              <FormItem type="radio" label="Yes, I would like to refine my search." name="help-anything-else" onChange={() => {}} />
              <FormItem type="radio" label="Yes, I would like to browse the full list of agencies." name="help-anything-else" onChange={() => {}} />
              <FormItem type="radio" label="Yes, I would like to go back to the FOIA.gov home page." name="help-anything-else" onChange={() => {}} />
              <FormItem type="radio" label="No" name="help-anything-else" onChange={() => {}} />
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

/**
 * @param {object} props
 * @param {WizardLink[]} props.links
 */
function WizardLinks({ links }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.url} data-score={link.score}>
          <p>{`${link.agency}: ${link.tag}`}</p>
          <a href={link.url}>{link.sentence}</a>
        </li>
      ))}
    </ul>
  );
}
WizardLinks.propTypes = {
  links: PropTypes.array,
};

/**
 * @param {object} props
 * @param {WizardAgency[]} props.agencies
 */
function WizardAgencies({ agencies }) {
  return (
    <ul>
      {agencies.map((agency) => (
        <li key={agency.agency} data-score={agency.confidence_score}>
          <a href={agency.url}>{`${agency.agency_abbrev}: ${agency.agency}`}</a>
        </li>
      ))}
    </ul>
  );
}
WizardAgencies.propTypes = {
  agencies: PropTypes.array,
};

export default Summary;
