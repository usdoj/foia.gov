import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageMeetingDocumentsComponent = props => (
  <a href={props.link} className="cfoc-page-meeting-document">{props.title}</a>
);


CFOCPageMeetingDocumentsComponent.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

CFOCPageMeetingDocumentsComponent.defaultProps = {
  title: '',
  link: '',
};

export default CFOCPageMeetingDocumentsComponent;
