import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeWorkGroupComponent from './cfoc_page_committee_workgroup';
import CFOCPageAttachmentsComponent from './cfoc_page_attachments';

const CFOCPageCommitteeDetailComponent = (props) => {
  const { title, body, attachments, workingGroups } = props;
  console.log(attachments);

  return (
    <div className="cfoc-committee-detail" >
      {
        !title
          ? null
          : (
            <h1>{title}</h1>
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
      { workingGroups.length ? <h3>Working Groups</h3> : null }
      {
        !workingGroups.length
          ? null
          : (
            workingGroups.map((group, index) => {
              const key = index + 1;
              return (
                <CFOCPageCommitteeWorkGroupComponent
                  title={group.item_title}
                  body={group.item_body}
                  attachments={group.item_attachments}
                  key={key}
                />
              );
            })
          )
      }
    </div>
  );
};

CFOCPageCommitteeDetailComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachments: PropTypes.array,
  attachment: PropTypes.shape({
    attachment_title: PropTypes.string,
    attachment_file: PropTypes.string,
  }),
  workingGroups: PropTypes.array,
  group: PropTypes.shape({
    item_title: PropTypes.string,
    item_body: PropTypes.string,
    item_attachments: PropTypes.any,
  }),
};

CFOCPageCommitteeDetailComponent.defaultProps = {
  title: '',
  body: '',
  attachments: [],
  attachment: {},
  workingGroups: [],
  group: {},
};

export default CFOCPageCommitteeDetailComponent;
