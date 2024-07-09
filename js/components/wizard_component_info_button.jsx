import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof InfoButton.propTypes>} props
 */
function InfoButton({ text, onClick }) {
  return (
    <button
      className="w-component-info-button"
      type="button"
      aria-label={text}
      onClick={onClick}
    />
  );
}

InfoButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default InfoButton;
