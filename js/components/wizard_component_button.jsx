import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  url,
  isLink,
  size,
  isButtonElement,
  onClick,
}) {
  let button;

  if (isButtonElement) {
    button = (
      <button
        className={`w-component-button${!isLink ? ' usa-button usa-button-primary-alt' : ' w-component-button--link'}${size ? ` usa-button-${size}` : ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else {
    button = (
      <a
        className={`w-component-button${!isLink ? ' usa-button usa-button-primary-alt' : ' w-component-button--link'}${size ? ` usa-button-${size}` : ''}`}
        href={url}
      >
        {children}
      </a>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{button}</>;
}

Button.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
  isLink: PropTypes.bool,
  size: PropTypes.string,
  isButtonElement: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
