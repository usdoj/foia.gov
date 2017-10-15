import React from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import { requestActions } from '../actions';
import agencyComponentStore from '../stores/agency_component';
import foiaRequestStore from '../stores/foia_request';
import Confirmation from '../components/confirmation';


class ConfirmationPage extends React.Component {
  static getStores() {
    return [agencyComponentStore, foiaRequestStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const { formData, submissionResult } = foiaRequestStore.getState();

    return {
      agencyComponent,
      formData,
      submissionResult,
    };
  }

  componentDidMount() {
    // TODO remove this, only for testing
    requestActions.fetchAgencyComponent(this.props.match.params.agencyComponentId)
      .then(requestActions.receiveAgencyComponent);
  }

  render() {
    const { agencyComponent, formData, submissionResult } = this.state;
    const { submission_id } = submissionResult;

    if (!agencyComponent) {
      // This shouldn't happen, since we're coming from the request form and
      // just had the agency component loaded.
      // TODO display an error message
      return null;
    }

    return (
      <div className="usa-grid">
        <Confirmation
          agencyComponent={agencyComponent}
          formData={formData}
          submissionResult={submissionResult}
        />
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(ConfirmationPage, { withProps: true });
