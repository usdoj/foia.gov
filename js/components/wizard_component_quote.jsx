import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Quote>} props
 */
function Quote({ children }) {
  return (
    <q className="w-component-quote">
      {children}
    </q>
  );
}

Quote.propTypes = {
  children: PropTypes.node,
};

export default Quote;
