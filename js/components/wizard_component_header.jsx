import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './wizard_layout_header';
import Logo from './wizard_component_logo';
import BackLink from './wizard_component_back_link';
import { useWizard } from '../stores/wizard_store';

function Header({ isDemo }) {
  const {
    page,
    actions,
    canGoBack,
  } = useWizard();

  let backLinkAction;
  let backLinkText;

  switch (page) {
    // This is probably meant to go back to the home page of the site.
    // TODO: May remove as it could be unnecessarily redundant.
    case 'Intro':
      backLinkAction = (e) => {
        e.preventDefault();
        actions.reset();
      };
      backLinkText = 'Home';
      break;
    case 'Query':
    case 'Question':
    case 'Continue':
    case 'Summary':
    case 'TopicIntro':
      backLinkAction = (e) => {
        e.preventDefault();
        actions.prevPage();
      };
      backLinkText = 'Back';
      break;

    default:
      break;
  }

  const imgSrc = '/img/foia-doj-logo-light.svg';

  return (
    <HeaderLayout
      headerUpper={(
        <Logo
          url="/"
          logoSrc={isDemo ? `//foia.gov.ddev.site${imgSrc}` : imgSrc}
          text="FOIA.gov"
        />
      )}
      headerLower={
        canGoBack && (
          <BackLink text={backLinkText} onClick={backLinkAction} />
        )
      }
    />
  );
}

Header.propTypes = {
  isDemo: PropTypes.bool,
};

export default Header;
