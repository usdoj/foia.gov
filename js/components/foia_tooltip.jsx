import React, { Component } from 'react';
import Tooltip from 'tooltip.js';
import PropTypes from 'prop-types';

class FoiaTooltip extends Component {
  componentDidMount() {
    this.tooltip = new Tooltip(this.trigger, {
      title: this.trigger.getAttribute('data-tooltip'),
      trigger: 'click',
      html: true,
    });
  }

  render() {
    return (
      <a className="tooltip-trigger" ref={(trigger) => { this.trigger = trigger; }} role="tooltip" data-tooltip={this.props.text}>
        <span className="visually-hidden">Help</span>
      </a>
    );
  }
}

FoiaTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FoiaTooltip;
