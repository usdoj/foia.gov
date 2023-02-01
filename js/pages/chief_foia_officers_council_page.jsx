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
      meetingsUpcoming,
      meetingsPast,
    } = chiefFOIAOfficersCouncilStore.getState();

    return {
      title,
      body,
      committees,
      meetingsUpcoming,
      meetingsPast,
    };
  }

  componentDidMount() {
    requestActions.fetchCFOCouncilData();
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
      committees,
      meetingsUpcoming,
      meetingsPast,
    } = this.state;
    return (
      <div className="chief-foia-officers-council-page cfoc-page">
        <CFOCPageComponent
          title={title}
          body={body}
          committees={committees}
          meetingsUpcoming={meetingsUpcoming}
          meetingsPast={meetingsPast}
        />
      </div>
    );
  }
}

export default withRouter(Container.create(ChiefFoiaOfficersCouncilPage, {
  withProps: true,
}));
