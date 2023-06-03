import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

function Modal({
  children,
  title,
  modalIsOpen,
  closeModal,
}) {
  return (
    <ReactModal
      className="c-modal__content"
      overlayClassName="c-modal__overlay"
      portalClassName="c-modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="All topics"
    >
      <div className="c-modal__close-button">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
        />
      </div>
      <h2 className="c-modal__title">{title}</h2>
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
