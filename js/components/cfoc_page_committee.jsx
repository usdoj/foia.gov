import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeWorkGroupComponent from './cfoc_page_committee_workgroup';
import CFOCPageAttachmentsComponent from './cfoc_page_attachments';

function CFOCPageCommitteeComponent(props) {
  const {
    title, body, attachments, workingGroupsActive, workingGroupsInactive,
  } = props;

  return (
    <div className="cfoc-page-committee">
      {
        !title
          ? null
          : (
            <h2><strong>{title}</strong></h2>
          )
      }
      {
        !body
          ? null
          : (
            <article dangerouslySetInnerHTML={{ __html: body }} />
          )
      }
      { attachments.length ? <CFOCPageAttachmentsComponent attachments={attachments} /> : null }
      {
        !workingGroupsActive.length
          ? null
          : (
            <div className="cfo-page-working-group-container">
              <h3>Working Groups</h3>
              {
                workingGroupsActive.map((workingGroup, index) => {
                  const key = index + 1;
                  return (
                    <CFOCPageCommitteeWorkGroupComponent
                      title={workingGroup.item_title}
                      body={workingGroup.item_body}
                      attachments={workingGroup.item_attachments}
                      key={key}
                    />
                  );
                })
              }
            </div>
          )
      }
      {
        !workingGroupsInactive.length
          ? null
          : (
            <div className="cfo-page-working-group-container">
              <h3>Inactive Working Groups</h3>
              {
                workingGroupsInactive.map((workingGroup, index) => {
                  const key = index + 1;
                  return (
                    <CFOCPageCommitteeWorkGroupComponent
                      title={workingGroup.item_title}
                      body={workingGroup.item_body}
                      attachments={workingGroup.item_attachments}
                      key={key}
                    />
                  );
                })
              }
            </div>
          )
      }
    </div>
  );
}

CFOCPageCommitteeComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachments: PropTypes.any,
  workingGroups: PropTypes.any,
};

CFOCPageCommitteeComponent.defaultProps = {
  title: '',
  body: '',
  attachments: [],
  workingGroups: [],
};

export default CFOCPageCommitteeComponent;
