import React from 'react';
import PropTypes from 'prop-types';

function BackLink({ text, onClick }) {
  return (
    <button className="w-component-back-link" onClick={onClick}>{text}</button>
  );
}

BackLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackLink;
