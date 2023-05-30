import React from 'react';
import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';

function WizardHtml({ mid }) {
  const { ui } = useWizard();

  return (
    <div dangerouslySetInnerHTML={{ __html: ui[mid] || '' }} />
  );
}

WizardHtml.propTypes = {
  mid: PropTypes.string.isRequired,
};

export default WizardHtml;
