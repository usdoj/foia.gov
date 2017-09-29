import React from 'react';
import PropTypes from 'prop-types';

function Tab(props){
  return(
    <p>{props.label}</p>
  );
}

function Tabs(props){
  return(
    <div className="sidebar_tab-controls">
      <Tab label={"Request directions"}/>
      <Tab label={"Agency information"}/>
    </div>
  );
}

Tabs.propTypes = {
  selectedTab: PropTypes.number
};

Tabs.defaultProps = {
  selectedTab: 0
}
export default Tabs;
