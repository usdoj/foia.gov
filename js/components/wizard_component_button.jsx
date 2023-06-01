import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  url,
  isLink,
  size,
}) {
  return (
    <a
      className={`c-button${!isLink ? ' usa-button usa-button-primary-alt' : ' c-button--link'}${size ? ` usa-button-${size}` : ''}`}
      href={url}
    >
      {children}
    </a>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
  isLink: PropTypes.bool,
  size: PropTypes.string,
};

export default Button;
