import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageComponent = props => (
  <div className="cfoc-page-content">
    <h1>{props.title}</h1>
    <article dangerouslySetInnerHTML={{ __html: props.body }} />
    <div className="cfoc-page-committees">
      {
        props.committees.map((committee, index) => (
          <div key={index}>
            <h2>{committee.committee_title}</h2>
            <article dangerouslySetInnerHTML={{ __html: committee.committee_body }} />
          </div>
        ))
      }
    </div>
    <div className="cfoc-page-meetings">
      {
        props.meetings.map((meeting, index) => (
          <div key={index}>
            <h2>{meeting.meeting_title}</h2>
            <article dangerouslySetInnerHTML={{ __html: meeting.meeting_body }} />
          </div>
        ))
      }
    </div>
  </div>
);

CFOCPageComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  committees: PropTypes.array,
  meetings: PropTypes.array,
};

export default CFOCPageComponent;
