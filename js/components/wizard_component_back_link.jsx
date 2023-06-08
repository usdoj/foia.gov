import React from 'react';
import PropTypes from 'prop-types';

function BackLink({ text }) {
  return (
    <a className="w-component-back-link">{text}</a>
  );
}

BackLink.propTypes = {
  text: PropTypes.string,
};

export default BackLink;
