import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Pill.propTypes>} props
 */
function Pill({ children, selected, onClick }) {
  return (
    <li>
      <button
        className="w-component-pill"
        type="button"
        data-selected={selected}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

Pill.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.number,
  onClick: PropTypes.func,
};

export default Pill;
