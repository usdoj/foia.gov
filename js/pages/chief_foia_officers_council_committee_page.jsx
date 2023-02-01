import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';
import { requestActions } from '../actions';
import CFOCPageCommitteeDetailComponent from '../components/cfoc_page_committee_detail';
import NotFoundPage from './not_found';

class ChiefFoiaOfficersCouncilCommitteePage extends Component {
  static getStores() {
    return [chiefFOIAOfficersCouncilStore];
  }

  static calculateState() {
    const {
      title,
      body,
      workingGroupsActive,
      workingGroupsInactive,
      hasData,
      status,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      workingGroupsActive,
      workingGroupsInactive,
      hasData,
      status,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    requestActions.fetchCFOCouncilCommitteeData(id);
  }

  componentDidUpdate() {
    // Run the external link script after data is fetched
    // eslint-disable-next-line no-undef
    runExtlink();
  }

  render() {
    const {
      title,
      body,
      workingGroupsActive,
      workingGroupsInactive,
      hasData,
      status,
    } = this.state;
    const notFound = status === 404 || status === 500 || hasData === false;

    return (
      !notFound
        ? (
          <div className="chief-foia-officers-council-committee-detail cfoc-page">
            <CFOCPageCommitteeDetailComponent
              title={title}
              body={body}
              workingGroupsActive={workingGroupsActive}
              workingGroupsInactive={workingGroupsInactive}
            />
          </div>
        )
        : (
          <NotFoundPage />
        )
    );
  }
}

ChiefFoiaOfficersCouncilCommitteePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

ChiefFoiaOfficersCouncilCommitteePage.defaultProps = {
  match: {
    params: {},
  },
};

export default withRouter(Container.create(ChiefFoiaOfficersCouncilCommitteePage, {
  withProps: true,
}));
