import React from 'react';
import PropTypes from 'prop-types';
import AppContainer from '../../03-layouts/AppContainer';
import Header from '../../04-components/Header';

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
