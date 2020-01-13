import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'tooltip.js';

class FoiaTooltip extends Component {
  componentDidMount() {
    const trigger = this.refs.trigger;
    new Tooltip(trigger, {
      title: trigger.getAttribute('data-tooltip'),
      trigger: "click",
      html: true
    });
  }
  
  render() {
    return (
      <a className="tooltip-trigger" ref="trigger" role="tooltip" data-tooltip="<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>">
        <span className="visually-hidden">Help</span>
      </a>
    )
  }
}

export default FoiaTooltip;
