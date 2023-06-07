import React from 'react';
import PropTypes from 'prop-types';

function FormItem({
  type,
  isLabelHidden,
  label,
  onChange,
  name,
  value,
  checked,
  placeholder,
}) {
  const id = label.toLowerCase().replaceAll(' ', '-');
  let element;

  switch (type) {
    case 'text':
      element = <input id={id} className="c-form-item__element" onChange={onChange} value={value} placeholder={placeholder} />;
      break;
    case 'textarea':
      element = <textarea id={id} className="c-form-item__element" onChange={onChange} value={value} placeholder={placeholder} />;
      break;
    case 'checkbox':
      element = <input type="checkbox" id={id} className="c-form-item__element" onChange={onChange} name={name} value={value} checked={checked} />;
      break;
    case 'radio':
      element = <input type="radio" id={id} className="c-form-item__element" onChange={onChange} name={name} value={value} checked={checked} />;
      break;

    default:
      break;
  }
  return (
    <div className={`c-form-item${type ? ` c-form-item--${type}` : ''}`}>
      {(type === 'checkbox' || type === 'radio') && element}
      <label htmlFor={id} className={`c-form-item__label${isLabelHidden ? ' visually-hidden' : ''}`}>{label}</label>
      {(type === 'text' || type === 'textarea') && element}
    </div>
  );
}

FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  isLabelHidden: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default FormItem;
