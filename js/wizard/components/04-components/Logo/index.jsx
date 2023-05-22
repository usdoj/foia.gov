import React from 'react';
import PropTypes from 'prop-types';

function Logo({ url, logoSrc, text }) {
  return (
    // Allowing accesskey since it is on the main site logo but noting there
    // may be accessibility concerns with the usage.
    // eslint-disable-next-line jsx-a11y/no-access-key
    <a className="c-logo" href={url} accessKey="1" title="Home">
      <img className="c-logo__image" src={logoSrc} alt="Foia.gov" />
      <h1 className="c-logo__text">{text}</h1>
    </a>
  );
}

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Logo;
