import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeWorkGroupComponent from './cfoc_page_committee_workgroup';

function CFOCPageCommitteeComponent(props) {
  const {
    title, body, workingGroupsActive, workingGroupsInactive,
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
  workingGroupsActive: PropTypes.any,
  workingGroupsInactive: PropTypes.any,
};

CFOCPageCommitteeComponent.defaultProps = {
  title: '',
  body: '',
  workingGroupsActive: [],
  workingGroupsInactive: [],
};

export default CFOCPageCommitteeComponent;
