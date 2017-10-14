import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import Tabs from 'components/tabs';
import FOIARequestForm from 'components/foia_request_form';
import agencyComponentStore from 'stores/agency_component';
import requestFormStore from 'stores/request_form';
import requestStore from 'stores/request';
import NotFound from './not_found';


class AgencyComponentRequestPage extends Component {
  static getStores() {
    return [agencyComponentStore, requestStore, requestFormStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const requestForm = requestFormStore.getAgencyComponentForm(agencyComponentId);
    const { formData, isSubmitting, submissionResult } = requestStore.getState();

    return {
      agencyComponent,
      formData,
      isSubmitting,
      submissionResult,
      requestForm,
    };
  }

  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const agencyComponentId = this.props.match.params.agencyComponentId;
    if (nextProps.match.params.agencyComponentId !== agencyComponentId) {
      this.init(nextProps);
    }
  }

  init(props) {
    const agencyComponentId = props.match.params.agencyComponentId;

    // Check agency component exists in store
    const { agencyComponent } = this.state;
    if (!agencyComponent || !agencyComponent.formFields.length) {
      requestActions.fetchAgencyComponent(agencyComponentId)
        .then(requestActions.receiveAgencyComponent)
        .catch((error) => {
          if (!error.response) {
            // Non-axios error, rethrow
            throw error;
          }

          if (error.response.status !== 404) {
            // API error other than 404, rethrow
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
    const { agencyComponent, requestForm } = this.state;
    return (
      <div className="usa-grid-full grid-left">
        <aside className="usa-width-five-twelfths sidebar" id="react-tabs">
          {
            agencyComponent && requestForm ?
              <Tabs
                agencyComponent={agencyComponent}
                requestForm={requestForm}
              /> :
              null
          }
        </aside>
        <div className="usa-width-seven-twelfths sidebar_content">
          {
            requestForm ?
              <FOIARequestForm
                formData={this.state.formData}
                isSubmitting={this.state.isSubmitting}
                requestForm={requestForm}
                submissionResult={this.state.submissionResult}
              /> :
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

export default Container.create(AgencyComponentRequestPage, { withProps: true });
