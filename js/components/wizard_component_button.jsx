import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Button.propTypes>} props
 */
function Button({
  children,
  href,
  isLink,
  disabled,
  onClick,
}) {
  if (typeof href !== 'string') {
    return (
      <button
        className={`w-component-button${!isLink ? ' usa-button usa-button-primary-alt usa-button-big' : ' w-component-button--link'}`}
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      className={`w-component-button${!isLink ? ' usa-button usa-button-primary-alt usa-button-big' : ' w-component-button--link'}`}
      href={href}
    >
      {children}
    </a>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  isLink: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
