import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'tooltip.js';
import PropTypes from 'prop-types';

class FoiaTooltip extends Component {
  _handleOnMouseEnter = (event) => {
    var html = event.target.getAttribute('title-data');
    event.target.setAttribute('title', $(html).text());
  }
  _handleOnClick = (event) => {
    var html = event.target.getAttribute('title-data');
    event.target.setAttribute('title', html);
    setTimeout($.proxy(function (e) {
      var html = event.target.getAttribute('title-data');
      event.target.setAttribute('title', $(html).text());
    }, 1000), event);
  }
  componentDidMount() {
    this.tooltip = new Tooltip(this.trigger, {
      title: this.trigger.getAttribute('data-tooltip'),
      trigger: 'click',
      html: true,
      closeOnClickOutside: true,
    });
    ReactDOM.findDOMNode(this).addEventListener('mouseenter', this._handleOnMouseEnter);
    ReactDOM.findDOMNode(this).addEventListener('click', this._handleOnClick);
  }
  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('mouseenter', this._handleOnMouseEnter);
    ReactDOM.findDOMNode(this).removeEventListener('click', this._handleOnClick);
  }

  render() {
    return (
      <button type="button" className="tooltip-trigger button-as-link" ref={(trigger) => { this.trigger = trigger; }} title="" title-data={this.props.text} >
        <span className="visually-hidden">Tooltip</span>
      </button>

    );
  }
}

FoiaTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FoiaTooltip;
