import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeComponent from './cfoc_page_committee';
import CFOCPageMeetingComponent from './cfoc_page_meeting';

function CFOCPageComponent(props) {
  const {
    title, body, committees, meetingsUpcoming, meetingsPast,
  } = props;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="cfoc-page-content">
      <h1>{title}</h1>
      <article dangerouslySetInnerHTML={{ __html: body }} />
      <div className="cfoc-page-content-items">
        {
          !committees
            ? null
            : (
              <div className="cfoc-page-committees">
                {
                  committees.map((committee, index) => {
                    const key = committee.committee_title.length * index;
                    return (
                      <CFOCPageCommitteeComponent
                        title={committee.committee_title}
                        body={committee.committee_body}
                        workingGroupsActive={committee.workingGroupsActive}
                        workingGroupsInactive={committee.workingGroupsInactive}
                        key={key}
                      />
                    );
                  })
                }
              </div>
            )
        }
        {
          !meetingsUpcoming.length
            ? null
            : (
              <div className="cfoc-page-upcoming-meetings">
                <h2><strong>UPCOMING MEETINGS:</strong></h2>
                <ul className="cfoc-page-upcoming-meetings-list usa-accordion">
                  {
                  meetingsUpcoming.reverse().map((meeting, index) => {
                    const key = index;
                    const id = `upcoming-${key.toString()}`;
                    const date = new Date(meeting.meeting_timestamp * 1000);

                    return (
                      <CFOCPageMeetingComponent
                        title={meeting.meeting_title}
                        body={meeting.meeting_body}
                        documents={meeting.meeting_documents}
                        materials={meeting.meeting_materials}
                        date={date.toLocaleString('en-US', dateOptions)}
                        id={id}
                        key={key}
                      />
                    );
                  })
                  }
                </ul>
              </div>
            )
        }
        {
          !meetingsPast.length
            ? null
            : (
              <div className="cfoc-page-past-meetings">
                <h2><strong>PAST MEETINGS:</strong></h2>
                <ul className="cfoc-page-past-meetings-list usa-accordion">
                  {
                  meetingsPast.map((meeting, index) => {
                    const key = index;
                    const id = `past-${key.toString()}`;
                    const date = new Date(meeting.meeting_timestamp * 1000);

                    return (
                      <CFOCPageMeetingComponent
                        title={meeting.meeting_title}
                        body={meeting.meeting_body}
                        documents={meeting.meeting_documents}
                        materials={meeting.meeting_materials}
                        date={date.toLocaleString('en-US', dateOptions)}
                        id={id}
                        key={key}
                      />
                    );
                  })
                  }
                </ul>
              </div>
            )
        }
      </div>
    </div>
  );
}

CFOCPageComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  committees: PropTypes.array,
  committee: PropTypes.shape({
    committee_title: PropTypes.string,
    committee_body: PropTypes.string,
    workingGroupsActive: PropTypes.any,
    workingGroupsInactive: PropTypes.any,
  }),
  meetingsUpcoming: PropTypes.array,
  meetingsPast: PropTypes.array,
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
  meetingsUpcoming: [],
  meetingsPast: [],
  meeting: {
    meeting_title: '',
    meeting_body: '',
    meeting_documents: [],
    meeting_materials: [],
  },
};

export default CFOCPageComponent;
