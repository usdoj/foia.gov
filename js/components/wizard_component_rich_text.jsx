import React from 'react';
import PropTypes from 'prop-types';

function RichText({ children, dangerouslySetInnerHTML }) {
  return (
    <div
      className="w-component-rich-text"
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </div>
  );
}

RichText.propTypes = {
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.object,
};

export default RichText;
