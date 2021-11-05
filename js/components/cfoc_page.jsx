import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeComponent from './cfoc_page_committee';

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
    <div className="cfoc-page-meetings" />
  </div>
);

CFOCPageComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  committees: PropTypes.array,
  meetings: PropTypes.array,
};

CFOCPageComponent.defaultProps = {
  title: '',
  body: '',
  committees: [],
  meetings: [],
};

export default CFOCPageComponent;
