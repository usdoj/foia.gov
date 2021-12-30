import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageAttachmentsComponent from './cfoc_page_attachments';

function CFOCPageCommitteeWorkGroupComponent(props) {
  const { title, body, attachments } = props;
  let workgroupId = (Math.floor(Math.random() * 10000000000000));
  workgroupId = `workgroup-${workgroupId}`;
  return (
    <ul className="cfoc-committee-workgroup usa-accordion">
      <li>
        <button className="usa-accordion-button" aria-controls={workgroupId} aria-expanded="false">
          { title }
        </button>
        <div id={workgroupId} className="usa-accordion-content">
          {
            !body
              ? null
              : (
                <article dangerouslySetInnerHTML={{ __html: props.body }} />
              )
          }
          <CFOCPageAttachmentsComponent attachments={attachments} />
        </div>
      </li>
    </ul>
  );
}

CFOCPageCommitteeWorkGroupComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachments: PropTypes.any,
};

CFOCPageCommitteeWorkGroupComponent.defaultProps = {
  title: '',
  body: '',
  attachments: [],
};

export default CFOCPageCommitteeWorkGroupComponent;
