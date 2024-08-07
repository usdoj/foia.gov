import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { log, useWizard } from '../stores/wizard_store';
import { urlParams } from '../util/wizard_helpers';
import CardGroup from './foia_component_card_group';
import BodyText from './wizard_component_body_text';
import Button from './wizard_component_button';
import FormItem from './wizard_component_form_item';
import Heading from './wizard_component_heading';
import MoreResults from './wizard_component_more_results';
import NoResults from './wizard_component_no_results';
import RichText from './wizard_component_rich_text';
import QuestionText from './wizard_component_question';
import WizardHtml from './wizard_html';
import Constrain from './wizard_layout_constrain';
import PageTemplate from './wizard_template_page';
import Description from './wizard_component_description';
import QuestionHead from './wizard_layout_question_head';
import Quote from './wizard_component_quote';
import Inline from './wizard_layout_inline';
import Label from './wizard_component_label';

const limit = parseInt(urlParams().get('limit') || '6', 10);

function Summary() {
  const {
    actions,
    activity,
    agenciesFirst,
    canSwitchToModelResults,
    displayedTopic,
    loading,
    showModelResults,
    request,
  } = useWizard();

  const { agencies, links, isError } = request;

  const [selectedAction, setSelectedAction] = useState(
    /** @type function | null */ null,
  );

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
          If the information above is not what you&#39;re looking for, the
          following agencies may have it.
        </Heading>
      ) : (
        <Heading tag="h2">
          The following agencies may have the records you seek:
        </Heading>
      )}
      <BodyText>
        Click each agency to learn more or to submit a FOIA request.
      </BodyText>
      <WizardAgencies agencies={agencies.slice(0, limit)} />
    </>
  );
  const linksSection = (
    <>
      {agenciesFirst && hasAgencies ? (
        <Heading tag="h2">
          If an agency above is not what you&#39;re looking for, the following
          public information may be useful.
        </Heading>
      ) : (
        <Heading tag="h2">We found the following public information:</Heading>
      )}
      <WizardLinks links={links.slice(0, limit)} />
    </>
  );

  if (activity.titleMid && !showModelResults) {
    log(
      'Since topic content is shown, model-provided agencies and docs are not displayed:',
      { agencies, links },
    );
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <QuestionHead>
            <h1>Search Summary</h1>
            <Inline>
              <Label isItalic>
                <WizardHtml mid="lookingFor" />
              </Label>
              <Quote>
                {showModelResults ? request.query : displayedTopic || request.query}
              </Quote>
            </Inline>
          </QuestionHead>

          {Boolean(activity.titleMid) && !showModelResults && (
            <WizardHtml mid={activity.titleMid} isSummaryAdvice />
          )}

          {canSwitchToModelResults && <MoreResults />}

          {showModelResults && (
            // Show agencies & links from model
            <>
              {!hasLinks && !hasAgencies && <NoResults />}
              {agenciesFirst && hasAgencies && agencySection}
              {hasLinks && linksSection}
              {!agenciesFirst && hasAgencies && agencySection}
            </>
          )}
          <Description>
            <a
              href="/how-wizard-works.html"
              target="_blank"
              className="w-how-wizard-works"
            >
              Learn more about why you got these results.
            </a>
          </Description>
          <form className="w-component-last-steps">
            <fieldset>
              <QuestionText>Were these results helpful?</QuestionText>
              <FormItem
                type="radio"
                name="was-helpful"
                labelHtml="Yes"
                value="Yes"
                onChange={() => setSelectedAction(() => () => actions.toLastSteps(true))}
              />
              <FormItem
                type="radio"
                name="was-helpful"
                labelHtml="No"
                value="No"
                onChange={() => setSelectedAction(() => actions.toFeedback)}
              />
              {selectedAction !== null && (
                <Button onClick={selectedAction}>Submit</Button>
              )}
            </fieldset>
          </form>
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
  const linkObjects = links.map((link) => ({
    id: link.abbreviation + link.parent_abbreviation + link.url,
    tag: link.component,
    title: link.title || '[title unavailable]',

    // parent_abbreviation is sometimes "nan", don't show this.
    subtitle: (link.parent_abbreviation || '').replace(/^nan$/, ''),

    url: link.url,
    confidenceScore: link.confidence_score.toFixed(4),
  }));

  return <CardGroup cardContent={linkObjects} alt />;
}
WizardLinks.propTypes = {
  links: PropTypes.array,
};

/**
 * @param {object} props
 * @param {WizardAgency[]} props.agencies
 */
function WizardAgencies({ agencies }) {
  const agencyObjects = agencies.map((agency) => ({
    id: agency.id,
    title: agency.title,
    confidenceScore: agency.confidence_score.toFixed(4),

    // this is actually the Department, but the card refers to it as agency
    tag: agency.parent ? agency.parent.name : '',

    // Polydelta has old URLs, update them as needed.
    url: agency.url.replace(/\/\?id=/, '/agency-search.html?id='),
  }));
  return <CardGroup cardContent={agencyObjects} />;
}
WizardAgencies.propTypes = {
  agencies: PropTypes.array,
};

export default Summary;
