import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useWizard } from '../stores/wizard_store';
import BodyText from './wizard_component_body_text';
import InfoButton from './wizard_component_info_button';
import Modal from './wizard_component_modal';

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
  ariaLabel,
}) {
  const { getMessage } = useWizard();
  const [modalIsOpen, setIsOpen] = useState(/** @type boolean */ false);
  const id = `FormItem${idCounter++}`;
  let element;

  switch (type) {
    case 'text':
      element = <input id={id} className="w-component-form-item__element" onChange={onChange} value={value} placeholder={placeholder} aria-label={ariaLabel} />;
      break;
    case 'textarea':
      element = <textarea id={id} className="w-component-form-item__element" onChange={onChange} value={value} placeholder={placeholder} disabled={disabled} maxLength={maxLength} aria-label={ariaLabel} />;
      break;
    case 'checkbox':
      element = <input type="checkbox" id={id} className="w-component-form-item__element" onChange={onChange} name={name} value={value} checked={checked} aria-label={ariaLabel} />;
      break;
    case 'radio':
      element = <input type="radio" id={id} className="w-component-form-item__element" onChange={onChange} name={name} value={value} checked={checked} aria-label={ariaLabel} />;
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
        {labelHtml && typeof labelHtml === 'string' ? (
          <span
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: labelHtml }}
          />
        ) : (
          labelHtml
        )}
        {tooltipMid ? (
          <InfoButton text="info" onClick={() => setIsOpen((prev) => !prev)} />
        ) : null}
      </label>
      {(type === 'text' || type === 'textarea') && element}

      {tooltipMid
        ? (
          <Modal
            title=""
            modalIsOpen={modalIsOpen}
            closeModal={() => setIsOpen(false)}
            contentLabel="Definition Tooltip"
          >
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
  ariaLabel: PropTypes.string,
};

export default FormItem;
