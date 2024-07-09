import PropTypes from 'prop-types';
import React from 'react';
import FormItem from './wizard_component_form_item';

function FeedbackRadioSet({
  name, prefix, suffix, options, onChange,
}) {
  return (
    <div className="w-component-feedback-option-set">
      {prefix}
      <div className="w-component-feedback-option-set__options">
        {options.map(({ label, value }, index) => {
          let ariaLabel;
          if (index === 0) {
            ariaLabel = `${prefix} ${value}`;
          } else if (index === options.length - 1) {
            ariaLabel = `${suffix} ${value}`;
          } else {
            ariaLabel = value;
          }

          return (
            <FormItem
              type="radio"
              name={name}
              key={label}
              labelHtml={label}
              value={value}
              onChange={onChange}
              ariaLabel={ariaLabel}
            />
          );
        })}
      </div>
      {suffix}
    </div>
  );
}

FeedbackRadioSet.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.number,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default FeedbackRadioSet;
