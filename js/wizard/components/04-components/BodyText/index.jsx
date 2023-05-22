import React from 'react';
import PropTypes from 'prop-types';

function BodyText({ children }) {
  return (
    <p className="c-body-text">{children}</p>
  );
}

BodyText.propTypes = {
  children: PropTypes.string,
};

export default BodyText;
