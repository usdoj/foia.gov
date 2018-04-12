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
    const includeReferenceFields = {
      agency_component: ['title', 'agency', 'foia_officers', 'submission_address'],
      agency: ['name'],
      foia_officers: ['name', 'title'],
    };
    requestActions.fetchAgencyFinderData(includeReferenceFields);
  }

  render() {

    const progress = agencyComponentStore.getState().agencyFinderDataProgress;
    if (progress >= 100) {

      const {
        agencyComponents
      } = this.state;

      let tableRows = [];
      agencyComponents.forEach(function(agency_component) {
        agency_component.foia_officers.forEach(function(foia_officer) {
          tableRows.push({
            'Component': agency_component.title,
            'Department': agency_component.agency.name,
            'Name': foia_officer.name,
            'Title': foia_officer.title,
          });
        });
      });

      console.log(tableRows);
    }

    return null;
  }
}

export default Container.create(AgencyComponentDownloadPage);
