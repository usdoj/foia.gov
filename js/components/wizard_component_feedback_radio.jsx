import PropTypes from 'prop-types';
import React from 'react';

function FeedbackRadioSet({ name, options, onChange }) {
  return (
    <div className="w-component-feedback-option-set">
      {options.map(({ label, value }) => {
        const id = `${name}-${value}`;
        return (
          <label key={id}>
            <input
              type="radio"
              id={id}
              className="w-component-form-item__element"
              name={name}
              value={value}
              onChange={onChange}
            />
            {label}
          </label>
        );
      })}
    </div>
  );
}

FeedbackRadioSet.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.number,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default FeedbackRadioSet;
