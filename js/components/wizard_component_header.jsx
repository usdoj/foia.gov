import React from 'react';
import PropTypes from 'prop-types';
import img from '../../www.foia.gov/img/foia-doj-logo.svg';
import imgLight from '../../www.foia.gov/img/foia-doj-logo-light.svg';
import HeaderLayout from './wizard_layout_header';
import Logo from './wizard_component_logo';
import BackLink from './wizard_component_back_link';

function Header({ isLight }) {
  const imgSrc = `${PATHS.images}/foia-doj-logo${isLight ? '-light' : ''}.svg`;
  const imgSrcDemo = isLight ? imgLight : img;

  return (
    <HeaderLayout
      headerUpper={(
        <Logo
          url="/"
          logoSrc={IS_DEMO ? imgSrcDemo : imgSrc}
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
  isLight: PropTypes.bool,
};

export default Header;
