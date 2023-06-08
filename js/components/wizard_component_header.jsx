import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from './wizard_layout_header';
import Logo from './wizard_component_logo';
import BackLink from './wizard_component_back_link';

function Header({ isDemo }) {
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
        <BackLink text="Home" />
      }
    />
  );
}

Header.propTypes = {
  isDemo: PropTypes.bool,
};

export default Header;
