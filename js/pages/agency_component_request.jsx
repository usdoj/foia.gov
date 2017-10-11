import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import Tabs from 'components/tabs';
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
    return (
      <div className="usa-grid-full grid-left">
        <aside className="usa-width-five-twelfths sidebar" id="react-tabs">
          <Tabs />
        </aside>
        <div className="usa-width-seven-twelfths sidebar_content">
          {this.state.agency && <FOIARequestForm agency={this.state.agency} /> }
        </div>
      </div>
    );
  }
}

AgencyComponentRequestPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(AgencyComponentRequestPage);
