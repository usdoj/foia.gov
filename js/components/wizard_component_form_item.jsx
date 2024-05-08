import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './wizard_component_modal';
import { useWizard } from '../stores/wizard_store';
import BodyText from './wizard_component_body_text';

let idCounter = 0;

/**
 * @param {import('prop-types').InferProps<typeof FormItem.propTypes>} props
 */
function FormItem({
  type,
  isLabelHidden,
  labelHtml,
  onChange,
  name,
  value,
  checked,
  mid,
  tooltipMid,
  placeholder,
  disabled,
  maxLength,
}) {
  const { getMessage } = useWizard();
  const [modalIsOpen, setIsOpen] = useState(/** @type boolean */ false);
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
      data-tooltip-mid={tooltipMid}
      className={`w-component-form-item${type ? ` w-component-form-item--${type}` : ''}`}
    >
      {(type === 'checkbox' || type === 'radio') && element}
      <label
        htmlFor={id}
        className={`w-component-form-item__label${isLabelHidden ? ' visually-hidden' : ''}`}
      >
        <span
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: labelHtml }}
        />
        {tooltipMid ? (
          <button style={{ marginLeft: '0.25em' }} type="button" onClick={() => setIsOpen((prev) => !prev)} className="unstyled-button">(i)</button>
        ) : null}
      </label>
      {(type === 'text' || type === 'textarea') && element}

      {tooltipMid
        ? (
          <Modal title="" modalIsOpen={modalIsOpen} closeModal={() => setIsOpen(false)} contentLabel="">
            <BodyText html={getMessage(tooltipMid)} />
          </Modal>
        )
        : null}
    </div>
  );
}

FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  isLabelHidden: PropTypes.bool,
  labelHtml: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  mid: PropTypes.string,
  tooltipMid: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default FormItem;
