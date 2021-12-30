import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageMeetingMaterialsComponent = props => (
  <a href={props.link} className="cfoc-page-meeting-material">{props.title}</a>
);


CFOCPageMeetingMaterialsComponent.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

CFOCPageMeetingMaterialsComponent.defaultProps = {
  title: '',
  link: '',
};

export default CFOCPageMeetingMaterialsComponent;
