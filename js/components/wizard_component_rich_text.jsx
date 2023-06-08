import React from 'react';
import PropTypes from 'prop-types';

function RichText({ children }) {
  return (
    <div className="w-component-rich-text">{children}</div>
  );
}

RichText.propTypes = {
  children: PropTypes.node,
};

export default RichText;
