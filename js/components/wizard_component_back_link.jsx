import React from 'react';
import PropTypes from 'prop-types';

function BackLink({ text, href, onClick }) {
  if (typeof href !== 'string') {
    return (
      <button
        className="w-component-back-link"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return (
    <a
      className="w-component-back-link"
      href={href}
    >
      {text}
    </a>
  );
}

BackLink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackLink;
