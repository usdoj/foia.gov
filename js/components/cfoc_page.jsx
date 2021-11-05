import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeComponent from './cfoc_page_committee';
import CFOCPageMeetingComponent from './cfoc_page_meeting';

const CFOCPageComponent = props => (
  <div className="cfoc-page-content">
    <h1>{props.title}</h1>
    <article dangerouslySetInnerHTML={{ __html: props.body }} />
    {
      !props.committees
        ? null
        : (
          props.committees.map((committee, index) => {
            const key = committee.committee_title.length * index;
            return (
              <CFOCPageCommitteeComponent
                title={committee.committee_title}
                body={committee.committee_body}
                key={key}
              />
            );
          })
        )
    }
    {
      !props.meetings
        ? null
        : (
          props.meetings.map((meeting, index) => {
            const key = meeting.meeting_title.length * index;

            return (
              <CFOCPageMeetingComponent
                title={meeting.meeting_title}
                body={meeting.meeting_body}
                documents={meeting.meeting_documents}
                materials={meeting.meeting_materials}
                key={key}
              />
            );
          })
        )
    }
  </div>
);

CFOCPageComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  committees: PropTypes.array,
  committee: PropTypes.shape({
    committee_title: PropTypes.string,
    committee_body: PropTypes.string,
  }),
  meetings: PropTypes.array,
  meeting: PropTypes.shape({
    meeting_title: PropTypes.string,
    meeting_body: PropTypes.string,
    meeting_documents: PropTypes.array,
    meeting_materials: PropTypes.array,
  }),
};

CFOCPageComponent.defaultProps = {
  title: '',
  body: '',
  committees: [],
  committee: {
    committee_title: '',
    committee_body: '',
  },
  meetings: [],
  meeting: {
    meeting_title: '',
    meeting_body: '',
    meeting_documents: [],
    meeting_materials: [],
  },
};

export default CFOCPageComponent;
