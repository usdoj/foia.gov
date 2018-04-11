import React, { Component } from 'react';
import { Container } from 'flux/utils';
import agencyComponentStore from '../stores/agency_component';
import { requestActions } from 'actions';

class AgencyComponentDownloadPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agencyComponents } = agencyComponentStore.getState();
    return {
      agencyComponents,
    };
  }

  componentDidMount() {
    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencyComponents.size) {
      return;
    }

    // Pre-fetch the list of agency components, re-purposing the "finder" code.
    const agencyComponentFields = [
      'title',
      'agency'
    ];
    requestActions.fetchAgencyFinderData(agencyComponentFields);
  }

  render() {

    const progress = agencyComponentStore.getState().agencyFinderDataProgress;
    if (progress == 100) {

      const {
        agencyComponents
      } = this.state;

      const tableRows = agencyComponents.map(function(item) {
        console.log(item.title);
        console.log(item.agency.name);
        return item;
      });
    }

    return null;
  }
}

export default Container.create(AgencyComponentDownloadPage);
