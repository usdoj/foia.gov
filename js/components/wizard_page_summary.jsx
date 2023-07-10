import React from 'react';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Heading from './wizard_component_heading';
import BodyText from './wizard_component_body_text';
import CardGroup from './foia_component_card_group';
import LastStepsBlock from './wizard_component_last_steps_block';
import NoResults from './wizard_component_no_results';
import RichText from './wizard_component_rich_text';
import WizardHtml from './wizard_html';

const limit = parseInt(new URLSearchParams(location.search).get('limit') || '6', 10);

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

  const hasTopicContent = typeof activity.titleMid === 'string';
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

          {hasTopicContent ? (
            <>
              <WizardHtml mid={activity.titleMid} />
              <LastStepsBlock />
            </>
          ) : (
            // Show agencies & links from model
            <>
              {!hasLinks && !hasAgencies && (
                <NoResults />
              )}

              {hasLinks && (
                <>
                  <Heading tag="h2">We found the following public information:</Heading>
                  <WizardLinks links={links.slice(0, limit)} />
                </>
              )}
              {hasAgencies && (
                <>
                  {hasLinks ? (
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
              )}
              {(hasLinks || hasAgencies) ? (
                <LastStepsBlock />
              ) : null}
            </>
          )}
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
      id: link.agency + link.tag + link.url,
      agencyName: link.agency,
      title: link.tag,
      subtitle: link.sentence,
      url: link.url,
      confidenceScore: link.score.toFixed(4),
    }
  ));

  return (
    <CardGroup cardContent={linkObjects} />
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
      id: `${agency.agency}{agency.confidence_score}`,

      // this is actually the Department, but the card refers to it as agency
      agencyName: agency.department || 'Department of Administrating',
      /* TODO Replace with actual department */

      title: agency.agency,
      url: agency.url,
      confidenceScore: agency.confidence_score.toFixed(4),
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
