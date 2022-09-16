import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeWorkGroupComponent from './cfoc_page_committee_workgroup';

function CFOCPageCommitteeDetailComponent(props) {
  const {
    title, body, workingGroupsActive, workingGroupsInactive,
  } = props;

  return (
    <div className="cfoc-committee-detail">
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

      { workingGroupsActive.length ? <h3>Working Groups</h3> : null }
      {
        !workingGroupsActive.length
          ? null
          : (
            workingGroupsActive.map((group, index) => {
              const key = index + 1;
              return (
                <CFOCPageCommitteeWorkGroupComponent
                  title={group.item_title}
                  body={group.item_body}
                  key={key}
                />
              );
            })
          )
      }
      { workingGroupsInactive.length ? <h3>Inactive Working Groups</h3> : null }
      {
        !workingGroupsInactive.length
          ? null
          : (
            workingGroupsInactive.map((group, index) => {
              const key = index + 1;
              return (
                <CFOCPageCommitteeWorkGroupComponent
                  title={group.item_title}
                  body={group.item_body}
                  key={key}
                />
              );
            })
          )
      }
    </div>
  );
}

CFOCPageCommitteeDetailComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachment: PropTypes.shape({
    attachment_title: PropTypes.string,
    attachment_file: PropTypes.string,
  }),
  workingGroupsActive: PropTypes.array,
  workingGroupsInactive: PropTypes.array,
  group: PropTypes.shape({
    item_title: PropTypes.string,
    item_body: PropTypes.string,
  }),
};

CFOCPageCommitteeDetailComponent.defaultProps = {
  title: '',
  body: '',
  attachment: {},
  workingGroupsActive: [],
  workingGroupsInactive: [],
  group: {},
};

export default CFOCPageCommitteeDetailComponent;
