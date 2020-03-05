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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    this.props.onClose(e);

    this.setState({ modalIsOpen: false });
  }

  handleSubmit(e) {
    this.props.onSubmit(e);

    this.closeModal();
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
              <div className="form-group form-group_footer">
                <button onClick={this.handleSubmit} disabled={!this.props.canSubmit()} className="usa-button usa-button-primary-alt">Submit</button>
                <button onClick={this.closeModal} className="usa-button usa-button-outline">Cancel</button>
                {this.props.modalAdditionalLink}
              </div>
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
  modalAdditionalLink: PropTypes.object,
  canSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

FoiaModal.defaultProps = {
  triggerText: 'Filter Results',
  modalAdditionalLink: null,
  canSubmit: () => true,
  onSubmit: e => e,
  onClose: e => e,
};

export default FoiaModal;
