import React from 'react';
import PropTypes from 'prop-types';

function Heading({ children, tag, weight }) {
  const HeadingTag = tag || 'h1';

  return (
    <HeadingTag className={`c-heading${weight ? ` c-heading--${weight}` : ''}`}>{children}</HeadingTag>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.string,
  weight: PropTypes.string,
};

export default Heading;
