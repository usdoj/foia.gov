import React, { Component } from 'react';
import Tooltip from 'tooltip.js';

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
      <a className="tooltip-trigger" ref={(trigger) => { this.trigger = trigger; }} role="tooltip" data-tooltip="<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>">
        <span className="visually-hidden">Help</span>
      </a>
    );
  }
}

export default FoiaTooltip;
