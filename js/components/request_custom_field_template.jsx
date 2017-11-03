import React from 'react';

function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children, displayLabel} = props;
  return (
    <div className={classNames}>
      { displayLabel &&
        <div>
          <label htmlFor={id}>{label}
            <span className="foia-request-form_is-required">{required ? "(required)" : null}</span>
          </label>
          {description}
        </div>
      }
      {children}
      {errors}
      {help}
    </div>
  );
}
export default CustomFieldTemplate;
