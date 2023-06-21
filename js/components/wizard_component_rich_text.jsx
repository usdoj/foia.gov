import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @param {string=} props.html
 * @param {string=} props.mid
 * @return {React.ElementType}
 */
function RichText({ children = '', html = '', mid }) {
  if (html) {
    return (
      <div
        className="w-component-rich-text"
        data-mid={mid}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="w-component-rich-text" data-mid={mid}>
      {children}
    </div>
  );
}

RichText.propTypes = {
  children: PropTypes.node,
  html: PropTypes.string,
  mid: PropTypes.string,
};

export default RichText;
