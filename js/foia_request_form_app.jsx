import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import { Container } from 'flux/utils';

import { RequestActions } from 'actions';
import AgencyComponentSelector from 'components/agency_component_selector';
import settings from 'settings';
import AgencyComponentStore from 'stores/agency_component';
import Api from 'util/api';

const api = new Api(settings.api.baseURL);
const jsonapi = new Api(settings.api.jsonApiBaseURL);

const dispatcher = new Dispatcher();
const agencyComponentStore = new AgencyComponentStore(dispatcher);

const requestActions = RequestActions({ dispatcher, api, jsonapi });

function init() {
  // Pre-fetch the list of agencies and components for typeahead
  requestActions.fetchAgencyFinderData()
    .then(requestActions.receiveAgencyFinderData);
}

function agencyChange(agency) {
  const { history } = window.app;
  requestActions.agencyChange(agency.id)
    .then(() => {
      history.push(`/agency-component/${agency.id}/`);
    });
}


class FOIARequestFormApp extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agency, selectedAgency, agencyComponents, agencies } = agencyComponentStore.getState();
    return {
      agencies,
      agency,
      agencyComponents,
      selectedAgency,
    };
  }

  componentDidMount() {
    init();
  }

  render() {
    const { agencies, agencyComponents } = this.state;

    return (
      <div>
        <AgencyComponentSelector
          agencies={agencies}
          agencyComponents={agencyComponents}
          onAgencyChange={agencyChange}
        />
      </div>
    );
  }
}

export default Container.create(FOIARequestFormApp);
