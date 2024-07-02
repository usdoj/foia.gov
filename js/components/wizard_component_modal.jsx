import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

const rootEl = document.querySelector('#wizard-react-app');
if (rootEl) {
  ReactModal.setAppElement(rootEl);
}

/**
 * @param {import('prop-types').InferProps<typeof Modal.propTypes>} props
 */
function Modal({
  children,
  title,
  modalIsOpen,
  closeModal,
  contentLabel,
  isAlt,
  hasInfoIcon,
}) {
  return (
    <ReactModal
      className="w-component-modal__content"
      overlayClassName="w-component-modal__overlay"
      portalClassName={`w-component-modal${isAlt ? ' w-component-modal--alt' : ''}`}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={contentLabel}
    >
      <div className="w-component-modal__close-button">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
        />
      </div>
      <h2 className="w-component-modal__title">
        {hasInfoIcon && (
          <div className="w-component-modal__icon" />
        )}
        {title}
      </h2>
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  isAlt: PropTypes.bool,
  hasInfoIcon: PropTypes.bool,
};

export default Modal;
