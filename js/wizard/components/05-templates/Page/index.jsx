import React from 'react';
import PropTypes from 'prop-types';
import Constrain from '../../03-layouts/Constrain';
import AppContainer from '../../03-layouts/AppContainer';

function Page({ children, color }) {
  return (
    <AppContainer color={color || 'blue'}>
      <Constrain>
        {children}
      </Constrain>
    </AppContainer>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Page;
