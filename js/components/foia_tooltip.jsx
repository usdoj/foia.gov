import React, { Component } from 'react';
import Tooltip from 'tooltip.js';
import PropTypes from 'prop-types';

class FoiaTooltip extends Component {
  componentDidMount() {
    this.tooltip = new Tooltip(this.trigger, {
      title: this.trigger.getAttribute('data-tooltip'),
      trigger: 'click',
      html: true,
      closeOnClickOutside: true,
    });
  }

  render() {
    return (
      <button type="button" className="tooltip-trigger button-as-link" ref={(trigger) => { this.trigger = trigger; }} title={this.props.text}>
        <span className="visually-hidden">Tooltip</span>
      </button>
    );
  }
}

FoiaTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FoiaTooltip;
