import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof BodyText.propTypes>} props
 */
function BodyText({ children, html = '' }) {
  if (html) {
    return (
      <p
        className="w-component-body-text"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <p className="w-component-body-text">{children}</p>
  );
}

BodyText.propTypes = {
  children: PropTypes.string,
  html: PropTypes.string,
};

export default BodyText;
