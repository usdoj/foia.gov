import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';

import { requestActions } from '../actions';

class ChiefFoiaOfficersCouncilDataPage extends Component {
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
    console.log(this.state);
    const theString = 'Stuff in here';
    return (
      <div>
        <h4>{theString}</h4>
      </div>
    );
  }
}

ChiefFoiaOfficersCouncilDataPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Container.create(ChiefFoiaOfficersCouncilDataPage, {
  withProps: true,
}));
