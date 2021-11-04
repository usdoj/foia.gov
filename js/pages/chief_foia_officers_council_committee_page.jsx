import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';

import { requestActions } from '../actions';

class ChiefFoiaOfficersCouncilCommitteePage extends Component {
  static getStores() {
    return [chiefFOIAOfficersCouncilStore];
  }

  static calculateState() {
    const {
      title,
      body,
      committees,
      meetings,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      committees,
      meetings,
    };
  }

  componentDidMount() {
    requestActions.fetchCFOCouncilData();
  }

  render() {
    return (
      <div>
        <h2>Chief Committee Page.</h2>
      </div>
    );
  }
}

export default withRouter(Container.create(ChiefFoiaOfficersCouncilCommitteePage, {
  withProps: true,
}));

