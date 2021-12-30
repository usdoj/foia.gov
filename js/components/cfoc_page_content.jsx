import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageAttachmentsComponent from './cfoc_page_attachments';

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
    {
      props.attachments.length
        ? <CFOCPageAttachmentsComponent attachments={props.attachments} />
        : null
    }
  </div>
);

CFOCPageContentComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachments: PropTypes.array,
};

CFOCPageContentComponent.defaultProps = {
  title: '',
  body: '',
  attachments: [],
};

export default CFOCPageContentComponent;
