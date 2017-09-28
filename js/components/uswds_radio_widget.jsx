import React from 'react';
const USWDSRadioWidget = function(props) {
  const { enumOptions, inline } = props.options;

return (
    <fieldset className="usa-fieldset-inputs field-radio-group">
      <ul class="usa-unstyled-list">
      {enumOptions.map((option, i) => {
        const radio = (
            <input
              type="radio"
              id={`${props.label}-${option.label}`}
              name={props.label}
              className={props.value ? "checked" : "unchecked"}
              onClick={() => props.onChange(!props.value)}
            />
        );

        return inline ? (
          <li>
            {radio}
            <label htmlFor={`${props.label}-${option.label}`} key={i} className={`radio-inline`}>
              {option.label}
            </label>
          </li>
        ) : (
          <li key={i} className={`radio`}>
            {radio}
            <label htmlFor={`${props.label}-${option.label}`}>{option.label}</label>
          </li>
        );
      })}
      </ul>
    </fieldset>
  );
};

export default USWDSRadioWidget;
