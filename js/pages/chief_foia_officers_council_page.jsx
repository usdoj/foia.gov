import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import chiefFOIAOfficersCouncilStore from '../stores/chief_foia_officers_council';
import CFOCPageComponent from '../components/cfoc_page';

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
    const {
      title,
      body,
      committees,
      meetings,
    } = this.state;
    return (
      <div className="chief-foia-officers-council-page">
        <CFOCPageComponent title={title} body={body} committees={committees} meetings={meetings} />
      </div>
    );
  }
}

export default withRouter(Container.create(ChiefFoiaOfficersCouncilPage, {
  withProps: true,
}));
