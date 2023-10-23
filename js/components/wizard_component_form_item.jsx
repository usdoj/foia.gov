import React from 'react';
import PropTypes from 'prop-types';

let idCounter = 0;

/**
 * @param {import('prop-types').InferProps<typeof FormItem.propTypes>} props
 */
function FormItem({
  type,
  isLabelHidden,
  label,
  onChange,
  name,
  value,
  checked,
  mid,
  placeholder,
  disabled,
  maxLength,
}) {
  const id = `FormItem${idCounter++}`;
  let element;

  switch (type) {
    case 'text':
      element = <input id={id} className="w-component-form-item__element" onChange={onChange} value={value} placeholder={placeholder} />;
      break;
    case 'textarea':
      element = <textarea id={id} className="w-component-form-item__element" onChange={onChange} value={value} placeholder={placeholder} disabled={disabled} maxLength={maxLength} />;
      break;
    case 'checkbox':
      element = <input type="checkbox" id={id} className="w-component-form-item__element" onChange={onChange} name={name} value={value} checked={checked} />;
      break;
    case 'radio':
      element = <input type="radio" id={id} className="w-component-form-item__element" onChange={onChange} name={name} value={value} checked={checked} />;
      break;

    default:
      break;
  }

  return (
    <div
      data-mid={mid}
      className={`w-component-form-item${type ? ` w-component-form-item--${type}` : ''}`}
    >
      {(type === 'checkbox' || type === 'radio') && element}
      <label htmlFor={id} className={`w-component-form-item__label${isLabelHidden ? ' visually-hidden' : ''}`}>{label}</label>
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  mid: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default FormItem;
