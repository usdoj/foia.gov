import React from 'react';
import PropTypes from 'prop-types';

function Logo({ url, logoSrc, text }) {
  return (
    // Allowing accesskey since it is on the main site logo but noting there
    // may be accessibility concerns with the usage.
    <div className="w-component-logo usa-logo">
      {/* eslint-disable-next-line jsx-a11y/no-access-key */}
      <a className="w-component-logo__link" href={url} accessKey="1" title="Home">
        <img className="w-component-logo__image" src={logoSrc} alt="Foia.gov" />
        <h1 className="w-component-logo__text usa-header-title">{text}</h1>
      </a>
    </div>
  );
}

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Logo;
