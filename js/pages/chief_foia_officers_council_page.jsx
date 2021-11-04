import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';

import { requestActions } from '../actions';

class ChiefFoiaOfficersCouncilPage extends Component {
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
        <h2>Chief FOIA Officers Council Page.</h2>
        <p>Simple Content in here.</p>
      </div>
    );
  }
}

export default withRouter(Container.create(ChiefFoiaOfficersCouncilPage, {
  withProps: true,
}));
