import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dispatcher from '../util/dispatcher';

class RemoveLink extends Component {
  constructor(props) {
    super(props);

    this.dispatchChange = this.dispatchChange.bind(this);
  }

  dispatchChange(e) {
    e.preventDefault();
    dispatcher.dispatch({
      type: this.props.eventType,
      selection: this.props.selection,
    });
  }

  render() {
    return (
      <div className="report-remove-field-button">
        <button onClick={this.dispatchChange} type="button" className="button-as-link">
          {this.props.text}
        </button>
      </div>
    );
  }
}

RemoveLink.propTypes = {
  eventType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selection: PropTypes.object.isRequired,
};

export default RemoveLink;
