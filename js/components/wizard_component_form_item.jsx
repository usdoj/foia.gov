import React from 'react';
import PropTypes from 'prop-types';

function FormItem({
  type,
  isLabelHidden,
  label,
  onChange,
  value,
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

    default:
      break;
  }
  return (
    <div className="c-form-item">
      <label htmlFor={id} className={`c-form-item__label${isLabelHidden ? ' visually-hidden' : ''}`}>{label}</label>
      {element}
    </div>
  );
}

FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  isLabelHidden: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormItem;
