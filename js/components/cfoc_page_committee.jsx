import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageCommitteeComponent = props => (
  <div className="cfoc-page-committees">
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

CFOCPageCommitteeComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

CFOCPageCommitteeComponent.defaultProps = {
  title: '',
  body: '',
};

export default CFOCPageCommitteeComponent;
