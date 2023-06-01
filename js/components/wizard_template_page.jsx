import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from './wizard_layout_app_container';
import Header from './wizard_component_header';

function Page({ children }) {
  return (
    <AppContainer>
      <Header />
      {children}
    </AppContainer>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
