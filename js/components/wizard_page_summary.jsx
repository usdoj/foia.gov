import React from 'react';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import LastStepsBlock from './wizard_component_last_steps_block';
import RichText from './wizard_component_rich_text';
import WizardHtml from './wizard_html';

function Summary() {
  const {
    activity, loading, request,
  } = useWizard();
  const {
    agencies, links, isError,
  } = request;

  if (activity.type !== 'summary') {
    throw new Error('Not a summary activity');
  }

  if (isError) {
    return (
      <PageTemplate>
        <Constrain>
          <WizardHtml mid="apiError" />
        </Constrain>
      </PageTemplate>
    );
  }

  if (loading) {
    return (
      <PageTemplate>
        <Constrain>
          <WizardHtml mid="loading" />
        </Constrain>
      </PageTemplate>
    );
  }

  const hasLinks = links && links.length > 0;
  const hasAgencies = agencies && agencies.length > 0;

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <h1><WizardHtml mid="lookingFor" /></h1>
          <blockquote>
            &ldquo;
            {request.query || request.topic.title}
            &rdquo;
          </blockquote>

          {typeof activity.titleMid === 'string' ? (
            // Topic/answer-specific content
            <WizardHtml mid={activity.titleMid} />
          ) : (
            // Show agencies & links from model
            <>
              {!hasLinks && !hasAgencies && (
                <WizardHtml mid="noResults" />
              )}

              {hasLinks && (
                <>
                  <h2>We found the following public information:</h2>
                  <WizardLinks links={links} />
                </>
              )}
              {hasAgencies && (
                <>
                  <h2>The following agencies may have the records you seek:</h2>
                  <p>Click each agency to learn more or to submit a FOIA request.</p>
                  <WizardAgencies agencies={agencies} />
                </>
              )}
            </>
          )}
          <LastStepsBlock />
        </RichText>
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
        /** this key is a lot, but sometimes the urls are not unique
            and the agency + tag combo is also typically not unique */
        <li key={link.agency + link.tag + link.url} data-score={link.score}>
          <p>{`${link.agency}: ${link.tag}`}</p>
          <a href={link.url}>{link.sentence}</a>
          {' '}
          {`(Confidence Score: ${link.score.toFixed(4)})`}
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
          <br />
          {`(Confidence Score: ${agency.confidence_score.toFixed(4)})`}
        </li>
      ))}
    </ul>
  );
}
WizardAgencies.propTypes = {
  agencies: PropTypes.array,
};

export default Summary;
