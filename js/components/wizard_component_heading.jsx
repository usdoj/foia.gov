import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Heading>} props
 */
function Heading({ children, tag, weight }) {
  const HeadingTag = tag || 'h1';

  return (
    <HeadingTag
      className={`w-component-heading${weight ? ` w-component-heading--${weight}` : ''}`}
    >
      {children}
    </HeadingTag>
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.string,
  weight: PropTypes.string,
};

export default Heading;
