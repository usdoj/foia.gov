import React from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import { requestActions } from '../actions';
import agencyComponentStore from '../stores/agency_component';
import requestStore from '../stores/request';


class ConfirmationPage extends React.Component {
  static getStores() {
    return [agencyComponentStore, requestStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const { formData, submissionResult } = requestStore.getState();

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
        <h1>Success!</h1>
        <section>
          <p>
            Your FOIA request has been created and is being sent to
            the {agencyComponent.title} now.  You’ll hear back from the agency
            confirming receipt in coming weeks using the contact information you
            provided. If you have questions about your request, feel free to
            reach out to the agency FOIA personnel using the information provided
            below.
          </p>
          <div>
            <h2>Cotact the agency</h2>
            <div>{agencyComponent.title}</div>
            <div>{agencyComponent.website.uri}</div>
            <div>{agencyComponent.email}</div>
            <div>{agencyComponent.telephone}</div>
          </div>
        </section>
        <section>
          <p>Below is a summary of your request.</p>
          <table>
            <tbody>
              { formData.toArray()
                  .map(([fieldName, value]) =>
                    (
                      <tr>
                        <td><strong>{fieldName}</strong></td>
                        <td>{value}</td>
                      </tr>
                    ),
                  )
              }
            </tbody>
          </table>
        </section>
        <section>
          <p>
            The record ID for your request is <strong>{submission_id}</strong>.
            The record ID is only for identifying your request on FOIA.gov.
            This number can help you resolve issues submitting your request to
            an agency. In case there is an issue submitting your request to the
            agency you selected, you can use this number to help.
          </p>
        </section>
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(ConfirmationPage, { withProps: true });
