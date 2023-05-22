import React from 'react';
import PropTypes from 'prop-types';
import HeaderLayout from '../../03-layouts/Header';
import Logo from '../Logo';
import { PATHS } from '../../00-config/_theme-settings.es6';
import img from '../../../../../www.foia.gov/img/foia-doj-logo.svg';
import imgLight from '../../../../../www.foia.gov/img/foia-doj-logo-light.svg';
import BackLink from '../BackLink';

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
