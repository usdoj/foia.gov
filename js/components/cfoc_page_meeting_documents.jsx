import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CFOCPageMeetingDocumentsComponent = props => (
  <Link to={props.link} className="cfoc-page-meeting-document">{props.title}</Link>
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
