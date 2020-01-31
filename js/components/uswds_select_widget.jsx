import React from 'react';
import PropTypes from 'prop-types';

const USWDSSelectWidget = props => (
  <div className="form-group field">
    { props.title &&
      <label htmlFor={props.id}><strong>{props.title}</strong></label>
    }
    <select
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.handleChange}
      className="usa-select usa-reset-width"
    >
      {props.placeholder &&
        <option value="">{props.placeholder}</option>
      }
      {props.options.map(opt => (
        <option value={opt.value} key={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

USWDSSelectWidget.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

USWDSSelectWidget.defaultProps = {
  value: '',
  handleChange: () => {},
  placeholder: ' - none - ',
};

export default USWDSSelectWidget;
