import React from 'react';
import PropTypes from 'prop-types';
import { log, useWizard } from '../stores/wizard_store';
import { urlParams } from '../util/wizard_helpers';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Heading from './wizard_component_heading';
import BodyText from './wizard_component_body_text';
import CardGroup from './foia_component_card_group';
import LastStepsBlock from './wizard_component_last_steps_block';
import NoResults from './wizard_component_no_results';
import RichText from './wizard_component_rich_text';
import WizardHtml from './wizard_html';
import MoreResults from './wizard_component_more_results';

const limit = parseInt(urlParams().get('limit') || '6', 10);

function Summary() {
  const {
    activity, agenciesFirst, canSwitchToModelResults, displayedTopic, loading, showModelResults, request,
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

  const agencySection = (
    <>
      {!agenciesFirst && hasLinks ? (
        <Heading tag="h2">
          If the information above is not what you&#39;re looking for, the following agencies
          may have it.
        </Heading>
      ) : (
        <Heading tag="h2">The following agencies may have the records you seek:</Heading>
      )}
      <BodyText>Click each agency to learn more or to submit a FOIA request.</BodyText>
      <WizardAgencies agencies={agencies.slice(0, limit)} />
    </>
  );
  const linksSection = (
    <>
      {agenciesFirst && hasAgencies ? (
        <Heading tag="h2">
          If an agency above is not what you&#39;re looking for, the following public information
          may be useful.
        </Heading>
      ) : (
        <Heading tag="h2">We found the following public information:</Heading>
      )}
      <WizardLinks links={links.slice(0, limit)} />
    </>
  );

  if (activity.titleMid && !showModelResults) {
    log('Since topic content is shown, model-provided agencies and docs are not displayed:', { agencies, links });
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <h1><WizardHtml mid="lookingFor" /></h1>
          <blockquote>
            &ldquo;
            {showModelResults ? request.query : (displayedTopic || request.query)}
            &rdquo;
          </blockquote>

          {Boolean(activity.titleMid) && !showModelResults && (
            <WizardHtml mid={activity.titleMid} isSummaryAdvice />
          )}

          {canSwitchToModelResults && <MoreResults />}

          {showModelResults && (
            // Show agencies & links from model
            <>
              {!hasLinks && !hasAgencies && (
                <NoResults />
              )}
              {agenciesFirst && hasAgencies && agencySection}
              {hasLinks && linksSection}
              {!agenciesFirst && hasAgencies && agencySection}
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
  const linkObjects = links.map((link) => (
    {
      id: link.abbreviation + link.parent_abbreviation + link.url,
      tag: link.component,
      title: link.title || '[title unavailable]',

      // parent_abbreviation is sometimes "nan", don't show this.
      subtitle: (link.parent_abbreviation || '').replace(/^nan$/, ''),

      url: link.url,
      confidenceScore: link.confidence_score.toFixed(4),
    }
  ));

  return (
    <CardGroup cardContent={linkObjects} alt />
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
  const agencyObjects = agencies.map((agency) => (
    {
      id: agency.id,
      title: agency.title,
      confidenceScore: agency.confidence_score.toFixed(4),

      // this is actually the Department, but the card refers to it as agency
      tag: agency.parent ? agency.parent.name : '',

      // Polydelta has old URLs, update them as needed.
      url: agency.url.replace(/\/\?id=/, '/agency-search.html?id='),
    }
  ));
  return (
    <CardGroup cardContent={agencyObjects} />
  );
}
WizardAgencies.propTypes = {
  agencies: PropTypes.array,
};

export default Summary;
