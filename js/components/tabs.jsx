import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      tabControls: ["Request directions", "Agency information"]
    };
    this.handleClickTab = this.handleClickTab.bind(this);
    this.renderTabControls = this.renderTabControls.bind(this);
    this.renderTabControl = this.renderTabControl.bind(this);
  };

  handleClickTab(index, event) {
    console.log(index);
    event.preventDefault();
    this.setState({
      selectedTab: index
    });
  }

  renderTabControl(name, index){
    console.log(index);
    let key = `tab-control_${index}`;
    let className = (index == this.state.selectedTab) ? 'tab_active' : '';
    return(
      <li key={key}
          className={className}
          onClick={this.handleClickTab.bind(this, index)}>
        <a>{name}</a>
      </li>
    );
  }

  renderTabControls(props){
    const tabControls = this.state.tabControls.map((name, index) => (
      this.renderTabControl(name, index)
    ));
    return (
      tabControls
    )
  }

  render(){
    const tabControls = this.renderTabControls(this.props);
    return(
      <div className="sidebar">
        <ul className="sidebar_tab-controls">
          { this.renderTabControls() }
        </ul>
        <ul className="sidebar_tabs">
          <li className={this.state.selectedTab==0 ? 'tab_active' : ''}>
            <p>This is the Request Directions tab.</p>
          </li>
          <li className={this.state.selectedTab==1 ? 'tab_active' : ''}>
            <p>This is the Agency Information tab.</p>
          </li>
        </ul>
      </div>
    );
  }
}

Tabs.propTypes = {
  selectedTab: PropTypes.number,
  tabControls: PropTypes.array
};

export default Tabs;
