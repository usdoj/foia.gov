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
    const { agencyComponent } = agencyComponentStore.getState();
    return {
      agencyComponent,
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const agencyComponentId = this.props.match.params.agencyComponentId;

    // Check agency component exists in store
    const { agencyComponent } = agencyComponentStore.getState();
    if (!agencyComponent.id) {
      requestActions.fetchAgency(agencyComponentId)
        .then(requestActions.receiveAgency)
        .catch((error) => {
          if (!error.response) {
            // Some kind of error
            throw error;
          }

          if (error.response.status !== 404) {
            // Unknown response code
            throw error;
          }

          this.setState({
            agencyComponentNotFound: true,
          });
        });
    }
  }

  render() {
    if (this.state.agencyComponentNotFound) {
      // The api returned a 404, we should do the same
      return <NotFound />;
    }

    // TODO show a loading indicator?
    const { agencyComponent } = this.state;
    return (
      <div className="usa-grid-full grid-left">
        <aside className="usa-width-five-twelfths sidebar" id="react-tabs">
          { agencyComponent.id ? <Tabs agencyComponent={agencyComponent} /> : null }
        </aside>
        <div className="usa-width-seven-twelfths sidebar_content">
          {
            agencyComponent.id ?
              <FOIARequestForm agencyComponent={this.state.agencyComponent} /> :
              <div>Loading…</div>
          }
        </div>
      </div>
    );
  }
}

AgencyComponentRequestPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(AgencyComponentRequestPage);
