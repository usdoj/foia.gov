import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeComponent from './cfoc_page_committee';
import CFOCPageMeetingComponent from './cfoc_page_meeting';

function CFOCPageComponent(props) {
  const {
    title, body, committees, meetingsUpcoming, meetingsPast,
  } = props;

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
                        attachments={committee.committee_attachments}
                        workingGroups={committee.working_groups}
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
                {
                  meetingsUpcoming.map((meeting, index) => {
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
                }
              </div>
            )
        }
        {
          !meetingsPast.length
            ? null
            : (
              <ul className="cfoc-page-meetings-past usa-accordion">
                <li>
                  <button className="usa-accordion-button" aria-controls="cfo-past-meetings" aria-expanded={!meetingsUpcoming.length ? 'true' : 'false'}>
                    PAST MEETINGS
                  </button>
                  <div id="cfo-past-meetings" className="usa-accordion-content" aria-hidden={meetingsUpcoming.length ? 'true' : 'false'}>
                    {
                      meetingsPast.map((meeting, index) => {
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
                    }
                  </div>
                </li>
              </ul>
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
    committee_attachments: PropTypes.any,
    working_groups: PropTypes.any,
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
