import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from './wizard_layout_app_container';
import Header from './wizard_component_header';

function Page({ children, color }) {
  return (
    <AppContainer color={color || 'blue'}>
      <Header isLight={color !== 'white'} />
      {children}
    </AppContainer>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Page;
