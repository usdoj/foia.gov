import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dispatcher from '../util/dispatcher';

class AddLink extends Component {
  constructor(props) {
    super(props);

    this.dispatchChange = this.dispatchChange.bind(this);
  }

  dispatchChange(e) {
    e.preventDefault();
    dispatcher.dispatch({
      type: this.props.eventType,
    });
  }

  render() {
    return (
      <div className="form-group field use-dark-icons">
        <a href="" onClick={this.dispatchChange}><span className="icon-plus" />
          {this.props.text}
        </a>
      </div>
    );
  }
}

AddLink.propTypes = {
  eventType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddLink;
