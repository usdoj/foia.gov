import React from 'react';
import HeaderLayout from './wizard_layout_header';
import Logo from './wizard_component_logo';
import BackLink from './wizard_component_back_link';
import { useWizard } from '../stores/wizard_store';

function Header() {
  const {
    actions,
    canGoBack,
  } = useWizard();

  return (
    <HeaderLayout
      headerUpper={(
        <Logo
          url="/"
          logoSrc="/img/foia-doj-logo-light.svg"
          text="FOIA.gov"
        />
      )}
      headerLower={
        canGoBack && (
          <BackLink
            text="Back"
            onClick={(e) => {
              e.preventDefault();
              actions.prevPage();
            }}
          />
        )
      }
    />
  );
}

export default Header;
