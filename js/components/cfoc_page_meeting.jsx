import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageMeetingComponent = props => (
  <div className="cfoc-page-meetings">
    {
      !props.title
        ? null
        : (
          <h2>{props.title}</h2>
        )
    }
    {
      !props.body
        ? null
        : (
          <article dangerouslySetInnerHTML={{ __html: props.body }} />
        )
    }
  </div>
);

CFOCPageMeetingComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

CFOCPageMeetingComponent.defaultProps = {
  title: '',
  body: '',
};

export default CFOCPageMeetingComponent;
