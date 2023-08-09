import React from 'react';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import RichText from './wizard_component_rich_text';

function WizardHtml({ isSummaryAdvice = false, mid }) {
  const { getMessage } = useWizard();

  return (
    <RichText mid={mid} html={getMessage(mid, isSummaryAdvice)} />
  );
}

WizardHtml.propTypes = {
  mid: PropTypes.string.isRequired,
  isSummaryAdvice: PropTypes.bool,
};

export default WizardHtml;
