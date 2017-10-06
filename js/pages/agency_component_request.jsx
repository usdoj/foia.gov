import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import FOIARequestForm from 'components/foia_request_form';
import agencyComponentStore from 'stores/agency_component';


class AgencyComponentRequestPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agency } = agencyComponentStore.getState();
    return {
      agency,
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const agencyComponentId = this.props.match.params.agencyComponentId;

    // Check agency exists in store
    const { agency } = agencyComponentStore.getState();
    if (!agency) {
      requestActions.fetchAgency(agencyComponentId)
        .then(requestActions.receiveAgency);
    }
  }

  render() {
    return this.state.agency && <FOIARequestForm agency={this.state.agency} />;
  }
}

AgencyComponentRequestPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(AgencyComponentRequestPage);
