import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestActions } from 'actions';
import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import agencyComponentStore from '../stores/agency_component';

/**
 * Load and display an Agency or Agency Component and allow navigation
 * between them.
 */
class LandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: null,
      agencyComponent: null,
      agencyComponentsForAgency: null,
      notFound: false,
      isCentralized: false,
    };
  }

  componentDidMount() {
    $('#main > .usa-hero, #learn-more').hide();
  }

  componentDidUpdate() {
    if (!this.props.agencyFinderDataComplete) {
      return;
    }
    this.consultQueryString();
  }

  setStateForAgency(agency, agencyComponentsForAgency) {
    this.setState({
      agency,
      agencyComponent: null,
      agencyComponentsForAgency,
    });
    this.props.onChangeUrlQueryParams({
      idQueryString: agency.id,
      typeQueryString: 'agency',
    });
  }

  setStateForComponent(agencyComponent, isCentralized = false) {
    this.setState({
      agency: null,
      agencyComponent,
      agencyComponentsForAgency: null,
      isCentralized,
    });
    this.props.onChangeUrlQueryParams({
      idQueryString: agencyComponent.id,
      typeQueryString: 'component',
    });
  }

  consultQueryString() {
    // We only want to do this one time.
    if (this.queryStringConsulted) {
      return;
    }
    this.queryStringConsulted = true;

    const {
      typeQueryString,
      idQueryString,
    } = this.props;

    try {
      switch (typeQueryString) {
        case 'agency': {
          const agency = agencyComponentStore.getAgency(idQueryString);
          const agencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(agency.id);
          this.setStateForAgency(agency, agencyComponentsForAgency);
          break;
        }
        case 'component': {
          const component = agencyComponentStore.getAgencyComponent(idQueryString);
          const agency = agencyComponentStore.getAgency(component.agency.id);
          this.setStateForComponent(component, agency.isCentralized());
          break;
        }
        default:
          location.href = '/';
      }
    } catch (err) {
      console.error(err);
      this.setState({ notFound: true });
    }
  }

  render() {
    // Note that the agencyComponent comes from two different sources, so the
    // properties might not be consistent.
    const agencyChange = (agencyComponent) => {
      function fetchAgencyComponent(agencyComponentId) {
        return requestActions.fetchAgencyComponent(agencyComponentId)
          .then(requestActions.receiveAgencyComponent)
          .then(() => agencyComponentStore.getAgencyComponent(agencyComponentId));
      }

      if (agencyComponent.type === 'agency_component') {
        fetchAgencyComponent(agencyComponent.id)
          .then((component) => this.setStateForComponent(component, false));
        return;
      }

      const agency = agencyComponentStore.getAgency(agencyComponent.id);

      // Treat centralized agencies as components
      if (agency.isCentralized()) {
        const component = agencyComponentStore
          .getState()
          .agencyComponents
          .find((c) => c.agency.id === agency.id);
        fetchAgencyComponent(component.id)
          .then((c) => this.setStateForComponent(c, true));
        return;
      }

      const agencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(agency.id);
      this.setStateForAgency(agency, agencyComponentsForAgency);
    };

    const { agencyFinderDataComplete, agencyFinderDataProgress } = this.props;
    const {
      agency, agencyComponent, agencyComponentsForAgency, isCentralized, notFound,
    } = this.state;

    return (
      <div className="usa-grid agency-preview">
        <p>
          <a href="/agency-search.html" className="agency-preview_back">Agency Search</a>
        </p>

        {notFound && (<h2>This agency could not be found.</h2>)}

        {!agencyFinderDataComplete && (
          <div className="foia-component-agency-search__loading">
            Loading progress:
            {' '}
            {agencyFinderDataProgress}
            %
          </div>
        )}

        {agencyComponent && (
          <AgencyComponentPreview
            agencyComponent={agencyComponent.toJS()}
            isCentralized={isCentralized}
            onAgencySelect={agencyChange}
          />
        )}
        {agency && (
          <AgencyPreview
            agency={agency}
            agencyComponentsForAgency={agencyComponentsForAgency}
            onAgencySelect={agencyChange}
          />
        )}
      </div>
    );
  }
}

LandingComponent.propTypes = {
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number.isRequired,
  onChangeUrlQueryParams: PropTypes.func.isRequired,
  idQueryString: PropTypes.string,
  typeQueryString: PropTypes.string,
};

LandingComponent.defaultProps = {
  agencyFinderDataProgress: 0,
  idQueryString: null,
  typeQueryString: null,
};

export default LandingComponent;
