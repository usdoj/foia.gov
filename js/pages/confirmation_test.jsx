/* eslint-disable */

/*
 * This is a test page to make it easier to style things on the confirmation
 * page. This page only appears in development. It uses stub data for the form
 * data so it is not sufficient only to test changes here, you should do a
 * complete submission to test.
 */

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { requestActions } from 'actions';
import { SubmissionResult } from 'models';
import agencyComponentStore from '../stores/agency_component';

import Confirmation from 'components/confirmation';
import FoiaRequestForm from 'components/foia_request_form';
import Tabs from 'components/tabs';
import agencyComponentRequestFormStore from 'stores/agency_component_request_form';
import foiaRequestStore from 'stores/foia_request';
import faker from 'faker'; // eslint-disable-line import/no-extraneous-dependencies
import NotFound from './not_found';
import scroll from '../util/scroll';

scroll.smoothScroll();

class ConfirmationPage extends Component {
  static getStores() {
    return [agencyComponentStore, foiaRequestStore, agencyComponentRequestFormStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const requestForm = agencyComponentRequestFormStore.getAgencyComponentForm(agencyComponentId);
    const submissionResult = new SubmissionResult({
      submission_id: '1534',
    });

    const formData = new Map({
      requester_contact: {
        name_first: 'George',
        name_last: 'Washington',
        address_line1: '1800 F Street',
        address_line2: 'Suite 202',
        address_city: 'Mount Vernon',
        address_state_province: 'Virginia',
        address_zip_postal_code: '98273',
        address_country: 'United States',
        company_organization: 'Democracy',
        email: 'washington@example.com',
        fax_number: '555-4211',
        phone_number: '555-5555',
      },
      request_description: {
        request_description: faker.lorem.paragraphs(3),
      },
      supporting_docs: {
        attachments_supporting_documentation: 'data:text/plain;filename=a%20text%20file.txt;filesize=12;base64,SGVsbG8KV29ybGQK',
      },
      processing_fees: {
        request_category: 'individual',
        fee_amount_willing: '25',
        fee_waiver: 'no',
        fee_waiver_explanation: faker.lorem.paragraphs(3),
      },
      expedited_processing: {
        expedited_processing: 'no',
        expedited_processing_explanation: faker.lorem.paragraphs(3),
      },
    });

    return {
      agencyComponent,
      formData,
      isSubmitting: false,
      submissionResult,
      requestForm,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    const { agencyComponentId } = this.props.match.params;
    const { agencyComponentIdPrev } = prevProps.match.params;
    if (agencyComponentId !== agencyComponentIdPrev) {
      this.init();
    }
  }

  init() {
    const { agencyComponentId } = this.props.match.params;

    requestActions.fetchRequestFormSections()
      .then(() => requestActions.fetchAgencyComponent(agencyComponentId))
      .then(requestActions.receiveAgencyComponent);
  }

  render() {
    const { agencyComponent, formData, requestForm, submissionResult } = this.state;

    function onSubmit() {}

    let mainContent;
    if (agencyComponent &&
        agencyComponent.title &&
        submissionResult &&
        submissionResult.submission_id) {
      mainContent = (
        <Confirmation
          agencyComponent={agencyComponent}
          formData={formData}
          requestForm={requestForm}
          submissionResult={submissionResult}
        />
      );
    }

    return (
      <div className="usa-grid-full grid-flex grid-left" ref={(ref) => { this.element = ref; }}>
        {
          agencyComponent && requestForm ?
            <Tabs
              agencyComponent={agencyComponent}
              requestForm={requestForm}
            /> :
            null
        }
        <div className="sidebar_content">
          { mainContent }
        </div>
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(ConfirmationPage, { withProps: true });
