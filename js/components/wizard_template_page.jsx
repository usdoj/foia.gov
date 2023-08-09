import React from 'react';
import PropTypes from 'prop-types';
import Header from './wizard_component_header';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @param {boolean=} props.isDemo
 * @return {React.ElementType}
 */
function PageTemplate({ children, isDemo }) {
  return (
    <>
      <Header isDemo={isDemo} />
      {children}
    </>
  );
}

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  isDemo: PropTypes.bool,
};

export default PageTemplate;
