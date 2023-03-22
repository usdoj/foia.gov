import React from 'react';
import PropTypes from 'prop-types';

function CustomFieldTemplate(props) {
  const {
    children,
    classNames,
    description,
    displayLabel,
    formContext,
    help,
    id,
    label,
    required,
    rawErrors,
  } = props;

  const classes = [classNames];
  // Check for errors in either of two places:
  // - formContext.errors: This is where errors returned from Drupal would be.
  // - rawErrors: This is where jsonSchema validation errors would be.
  const error = formContext.errors[id] || ((rawErrors.length) ? rawErrors[0] : false);

  console.log("request",error);
  if (error) {
    classes.push('usa-input-error');
  }

  return (
    <div className={classes.join(' ')}>
      { displayLabel
        && (
        <div>
          <label htmlFor={id}>
            {label}
            <span className="foia-request-form_is-required">{required ? 'Required' : null}</span>
          </label>
          {description}
        </div>
        )}
      {children}
      { error
        && (
        <div
          className="usa-input-error-message"
          role="alert"
          dangerouslySetInnerHTML={{ __html: error }}
        />
        )}
      {help}
    </div>
  );
}

CustomFieldTemplate.propTypes = {
  children: PropTypes.object,
  classNames: PropTypes.string,
  description: PropTypes.object,
  displayLabel: PropTypes.bool,
  formContext: PropTypes.object,
  help: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  rawErrors: PropTypes.array,
};

CustomFieldTemplate.defaultProps = {
  children: {},
  classNames: '',
  description: {},
  displayLabel: true,
  formContext: {},
  help: {},
  id: '',
  label: '',
  required: false,
  rawErrors: [],
};

export default CustomFieldTemplate;
