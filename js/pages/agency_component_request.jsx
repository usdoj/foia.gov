import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';

import { requestActions } from 'actions';
import Confirmation from 'components/confirmation';
import FoiaRequestForm from 'components/foia_request_form';
import Tabs from 'components/tabs';
import agencyComponentStore from 'stores/agency_component';
import agencyComponentRequestFormStore from 'stores/agency_component_request_form';
import foiaRequestStore from 'stores/foia_request';
import NotFound from './not_found';
import { scrollOffset } from '../util/dom';


class AgencyComponentRequestPage extends Component {
  static getStores() {
    return [agencyComponentStore, foiaRequestStore, agencyComponentRequestFormStore];
  }

  static calculateState(prevState, props) {
    const agencyComponentId = props.match.params.agencyComponentId;
    const agencyComponent = agencyComponentStore.getAgencyComponent(agencyComponentId);
    const requestForm = agencyComponentRequestFormStore.getAgencyComponentForm(agencyComponentId);
    const { formSections } = agencyComponentRequestFormStore.getState();
    const { formData, upload, submissionResult } = foiaRequestStore.getState();

    return {
      agencyComponent,
      formData,
      formSections,
      upload,
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

    // Check the form sections were fetched
    const { formSections } = this.state;
    const formSectionsFetch = formSections.size ?
      Promise.resolve() :
      requestActions.fetchRequestFormSections();

    // Check agency component exists in store
    const { agencyComponent } = this.state;
    if (!agencyComponent || !agencyComponent.formFields.length) {
      formSectionsFetch.then(() => {
        // TODO this isn't very intuitive
        // We chain the requests sequentially, since computing the agency
        // request form depends on having the form sections fetched. We make
        // sure to only start the agency component request _after_ we've
        // received the form sections.
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
      });
    }
  }

  render() {
    const {
      agencyComponent,
      formData,
      formSections,
      requestForm,
      submissionResult,
    } = this.state;

    if (this.state.agencyComponentNotFound) {
      // The api returned a 404, we should do the same
      return <NotFound />;
    }

    const onSubmit = () => {
      // Scroll to the top of the page.
      window.scrollTo(0, scrollOffset(this.element));
    };

    let mainContent;
    if (submissionResult && submissionResult.submission_id) {
      mainContent = (
        <Confirmation
          agencyComponent={agencyComponent}
          formData={formData}
          requestForm={requestForm}
          submissionResult={submissionResult}
        />
      );
    } else if (requestForm) {
      mainContent = (
        <FoiaRequestForm
          formData={formData}
          formSections={formSections}
          upload={this.state.upload}
          onSubmit={onSubmit}
          requestForm={requestForm}
          submissionResult={submissionResult}
        />
      );
    } else {
      // TODO show a loading indicator?
      mainContent = <div>Loading…</div>;
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

AgencyComponentRequestPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Container.create(AgencyComponentRequestPage, { withProps: true });
