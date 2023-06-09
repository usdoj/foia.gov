import React from 'react';
import PropTypes from 'prop-types';
import Header from './wizard_component_header';

function Page({ children, isDemo }) {
  return (
    <>
      <Header isDemo={isDemo} />
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isDemo: PropTypes.bool,
};

export default Page;
