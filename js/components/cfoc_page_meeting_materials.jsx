import React from 'react';
import PropTypes from 'prop-types';

function CFOCPageMeetingMaterialsComponent(props) {
  return <a href={props.link} className="cfoc-page-meeting-material">{props.title}</a>;
}

CFOCPageMeetingMaterialsComponent.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

CFOCPageMeetingMaterialsComponent.defaultProps = {
  title: '',
  link: '',
};

export default CFOCPageMeetingMaterialsComponent;
