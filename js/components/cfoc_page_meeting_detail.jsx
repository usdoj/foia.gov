import React from 'react';
import PropTypes from 'prop-types';

function CFOCPageMeetingDetailComponent(props) {
  return (
    <div className="cfoc-meeting-detail">
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.heading }} />
      <article dangerouslySetInnerHTML={{ __html: props.body }} />
      {
      props.agenda.length
        ? (
          <div className="cfoc-meeting-detail-agenda">
            {
              (
                props.agenda.map((item, index) => {
                  const key = `${item.agenda_title}_${index}`;
                  return (
                    <div className="cfo-meeting-detail-agenda-item" key={key}>
                      <div>{item.agenda_time}</div>
                      <div>
                        <span className="title">{item.agenda_title}</span>
                        <span>{item.agenda_description}</span>
                      </div>
                    </div>
                  );
                })
              )
            }
          </div>
        )
        : null
    }
    </div>
  );
}

CFOCPageMeetingDetailComponent.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  body: PropTypes.string,
  agenda: PropTypes.array,
  item: PropTypes.shape({
    agenda_time: PropTypes.string,
    agenda_title: PropTypes.string,
    agenda_description: PropTypes.string,
  }),
};

CFOCPageMeetingDetailComponent.defaultProps = {
  title: '',
  heading: '',
  body: '',
  agenda: [],
  item: {
    agenda_time: '',
    agenda_title: '',
    agenda_description: '',
  },
};

export default CFOCPageMeetingDetailComponent;
