import React from 'react';
import PropTypes from 'prop-types';

const CFOCPageContentComponent = props => (
  <div className="cfoc-page-content" >
    {
      !props.title
        ? null
        : (
          <h1>{props.title}</h1>
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

CFOCPageContentComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

CFOCPageContentComponent.defaultProps = {
  title: '',
  body: '',
};

export default CFOCPageContentComponent;
