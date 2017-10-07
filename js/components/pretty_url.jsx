import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';

function parseDomain(href) {
  return url.parse(href).host;
}

function PrettyUrl({ className, href, children }) {
  const display = children || parseDomain(href);
  return (
    <a href={href} className={className}>{ display }</a>
  );
}

PrettyUrl.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
};

PrettyUrl.defaultProps = {
  children: null,
  className: null,
};

export default PrettyUrl;
