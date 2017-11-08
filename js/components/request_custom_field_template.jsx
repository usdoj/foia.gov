import React from 'react';
import PropTypes from 'prop-types';

function CustomFieldTemplate(props) {
  const {
    children,
    classNames,
    description,
    displayLabel,
    errors,
    formContext,
    help,
    id,
    label,
    required,
  } = props;

  const classes = [classNames];
  const error = formContext.errors[id];
  if (error) {
    classes.push('usa-input-error');
  }

  return (
    <div className={classes.join(' ')}>
      { displayLabel &&
        <div>
          <label htmlFor={id}>{label}
            <span className="foia-request-form_is-required">{required ? 'Required' : null}</span>
          </label>
          {description}
        </div>
      }
      {children}
      {errors}
      { error &&
        <div
          className="usa-input-error-message"
          role="alert"
          dangerouslySetInnerHTML={{ __html: error }} // eslint-disable-line react/no-danger
        />
      }
      {help}
    </div>
  );
}

CustomFieldTemplate.propTypes = {
  children: PropTypes.object,
  classNames: PropTypes.string,
  description: PropTypes.object,
  displayLabel: PropTypes.boolean,
  errors: PropTypes.object,
  formContext: PropTypes.object,
  help: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.boolean,
};

CustomFieldTemplate.defaultProps = {
  children: {},
  classNames: '',
  description: {},
  displayLabel: true,
  errors: {},
  formContext: {},
  help: {},
  id: '',
  label: '',
  required: false,
};

export default CustomFieldTemplate;
