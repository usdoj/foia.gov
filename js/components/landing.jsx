import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestActions } from 'actions';
import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import agencyComponentStore from '../stores/agency_component';

class LandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: null,
      agencyComponent: null,
      agencyComponentsForAgency: null,
      showHome: props.typeQueryString === null,
    };
  }

  syncHomeContentVisibility() {
    const method = this.state.showHome ? 'show' : 'hide';
    $('#main > .usa-hero, #learn-more')[method]();
  }

  componentDidMount() {
    this.syncHomeContentVisibility();
  }

  componentDidUpdate() {
    this.syncHomeContentVisibility();

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

    if (typeQueryString === 'agency') {
      const agency = agencyComponentStore.getAgency(idQueryString);
      const agencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(agency.id);
      this.setStateForAgency(agency, agencyComponentsForAgency);
    }
    if (typeQueryString === 'component') {
      const component = agencyComponentStore.getAgencyComponent(idQueryString);
      const agency = agencyComponentStore.getAgency(component.agency.id);
      this.setStateForComponent(component, agency.isCentralized());
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

    return (
      <div className="usa-grid agency-preview">
        <p>
          <a href="/agency-search.html" className="agency-preview_back">Agency Search</a>
        </p>

        {!agencyFinderDataComplete && (
          <div className="foia-component-agency-search__loading">
            Loading progress:
            {' '}
            {agencyFinderDataProgress}
            %
          </div>
        )}

        {
          this.state.agencyComponent
          && (
            <AgencyComponentPreview
              agencyComponent={this.state.agencyComponent.toJS()}
              isCentralized={this.state.isCentralized}
              onAgencySelect={agencyChange}
            />
          )
        }
        {
          this.state.agency
          && (
            <AgencyPreview
              agency={this.state.agency}
              agencyComponentsForAgency={this.state.agencyComponentsForAgency}
              onAgencySelect={agencyChange}
            />
          )
        }
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
