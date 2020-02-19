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

  iconColor() {
    const colorClasses = {
      dark: 'use-dark-icons',
      light: 'use-light-icons',
    };

    return colorClasses[this.props.iconColor] || false;
  }

  render() {
    let classes = this.props.classes.length > 0 ? this.props.classes : ['form-group', 'field'];
    classes = classes.concat(this.iconColor())
      .filter(className => className !== false);

    return (
      <div className={classes.join(' ')}>
        <a href="" onClick={this.dispatchChange}>{this.props.icon}
          {this.props.text}
        </a>
      </div>
    );
  }
}

AddLink.propTypes = {
  eventType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  iconColor: PropTypes.string,
  classes: PropTypes.array,
};

AddLink.defaultProps = {
  icon: (<span className="icon-plus" />),
  iconColor: 'dark',
  classes: [],
};

export default AddLink;
