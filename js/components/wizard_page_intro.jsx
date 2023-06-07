import React from 'react';
// import PropTypes from 'prop-types';
import { useWizard } from '../stores/wizard_store';
import WizardHtml from './wizard_html';

function Intro() {
  const {
    actions, ready,
  } = useWizard();

  if (!ready) {
    return <div>Loading app...</div>;
  }

  return (
    <div>
      <p>
        <a href="/" style={{ color: '#fff' }} tabIndex={0}>
          <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use xlinkHref="/img/uswds-3.2.0-sprite.svg#navigate_before" />
          </svg>
          {' '}
          Back
        </a>
      </p>
      <WizardHtml mid="intro0" />
      <button
        type="button"
        className="usa-button"
        onClick={actions.nextPage}
      >
        Begin
      </button>
    </div>
  );
}

export default Intro;
