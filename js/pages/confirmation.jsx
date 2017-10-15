import React from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import faker from 'faker';

import { requestActions } from '../actions';
import agencyComponentStore from '../stores/agency_component';
import agencyComponentRequestFormStore from '../stores/agency_component_request_form';
import foiaRequestStore from '../stores/foia_request';
import Confirmation from '../components/confirmation';
import { SubmissionResult } from '../models';


class ConfirmationPage extends React.Component {
  static getStores() {
    return [agencyComponentStore, agencyComponentRequestFormStore, foiaRequestStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const requestForm = agencyComponentRequestFormStore.getAgencyComponentForm(agencyComponentId);
    const { formData, submissionResult } = foiaRequestStore.getState();

    return {
      agencyComponent,
      formData,
      requestForm,
      submissionResult,
    };
  }

  componentDidMount() {
    // TODO remove this, only for testing
    requestActions.fetchAgencyComponent(this.props.match.params.agencyComponentId)
      .then(requestActions.receiveAgencyComponent);
  }

  render() {
    let { agencyComponent, formData, requestForm, submissionResult } = this.state;
    if (!agencyComponent) {
      // This shouldn't happen, since we're coming from the request form and
      // just had the agency component loaded.
      // TODO display an error message
      return null;
    }

    formData = new Map({
      requester_contact: {
        name_first: 'Aaron',
        name_last: 'Borden',
        address_line1: '50 United Nations Plaza',
        address_city: 'San Francisco',
        address_state: 'California',
      },
      additional_fields: {
        description: `
        Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.
          Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.
          Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.
          Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.
          Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.
          Your FOIA request has been created and is being sent to the Office of the Inspector General now. You’ll hear back from the agency confirming receipt in coming weeks using the contact information you provided. If you have questions about your request, feel free to reach out to the agency FOIA personnel using the information provided below.`,
        fees: '25',
      },
    });
    requestForm = {
      jsonSchema: {
        properties: {
          requester_contact: {
            properties: {
              name_first: { title: 'First name' },
              name_last: { title: 'Last name' },
              address_line1: { title: 'Address line1' },
              address_city: { title: 'City' },
              address_state: { title: 'State' },
            },
          },
          additional_fields: {
            properties: {
              description: { title: 'Description' },
              fees: { title: 'Processing fees' },
            },
          },
        },
      },
      uiSchema: {
        requester_contact: {},
        additional_fields: {},
      },
      sections: [
        { id: 'requester_contact', title: 'Requester contact' },
        { id: 'additional_fields', title: 'Additional fields' },
      ],
    };

    submissionResult = new SubmissionResult();

    return (
      <div className="usa-grid">
        <Confirmation
          agencyComponent={agencyComponent}
          formData={formData}
          requestForm={requestForm}
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
