import React from 'react';
import PropTypes from 'prop-types';


function USWDSRadioWidget(props) {
  const { enumOptions, inline } = props.options;

  return (
    <fieldset className="usa-fieldset-inputs field-radio-group">
      <ul className="usa-unstyled-list">
        {enumOptions.map((option) => {
          const key = `${props.label}-${option.label}`;
          const radio = (
            <input
              type="radio"
              id={key}
              name={props.label}
              className={props.value ? 'checked' : 'unchecked'}
              onChange={() => props.onChange(!props.value)}
            />
          );


          return inline ? (
            <li>
              {radio}
              <label htmlFor={key} key={key} className={'radio-inline'}>
                {option.label}
              </label>
            </li>
          ) : (
            <li key={key} className={'radio'}>
              {radio}
              <label htmlFor={`${props.label}-${option.label}`}>{option.label}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

USWDSRadioWidget.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

USWDSRadioWidget.defaultProps = {
  options: {},
  value: '',
  onChange: () => {},
};

export default USWDSRadioWidget;
