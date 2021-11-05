import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CFOCPageMeetingMaterialsComponent = props => (
  <Link to={props.link} className="cfoc-page-meeting-material">{props.title}</Link>
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
