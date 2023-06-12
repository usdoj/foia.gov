import React from 'react';
import PropTypes from 'prop-types';
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
}) {
  return (
    <ReactModal
      className="w-component-modal__content"
      overlayClassName="w-component-modal__overlay"
      portalClassName="w-component-modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="All topics"
    >
      <div className="w-component-modal__close-button">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
        />
      </div>
      <h2 className="w-component-modal__title">{title}</h2>
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Modal;
