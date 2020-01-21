import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#main');

class FoiaModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal} className="usa-button usa-button-outline usa-button-small" type="button">{this.props.triggerText}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel={this.props.ariaLabel}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal__close">
            <button onClick={this.closeModal} className="close-button" type="button">
              <span className="visually-hidden">Close modal: {this.props.ariaLabel}</span>
            </button>
          </div>
          <div className="modal__inner">
            <div className="modal__content">
              {this.props.modalContent}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

FoiaModal.propTypes = {
  triggerText: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  modalContent: PropTypes.object.isRequired,
};

FoiaModal.defaultProps = {
  triggerText: 'Filter Results',
};

export default FoiaModal;
