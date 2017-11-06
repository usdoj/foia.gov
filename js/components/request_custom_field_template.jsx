import React from 'react';
import PropTypes from 'prop-types';

function CustomFieldTemplate(props) {
  const {
    children,
    classNames,
    description,
    displayLabel,
    errors,
    help,
    id,
    label,
    required,
  } = props;
  return (
    <div className={classNames}>
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
  help: {},
  id: '',
  label: '',
  required: false,
};

export default CustomFieldTemplate;
