import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @param {string=} props.html
 * @return {React.ElementType}
 */
function RichText({ children = '', html = '' }) {
  if (html) {
    return (
      <div
        className="w-component-rich-text"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="w-component-rich-text">
      {children}
    </div>
  );
}

RichText.propTypes = {
  children: PropTypes.node,
  html: PropTypes.string,
};

export default RichText;
