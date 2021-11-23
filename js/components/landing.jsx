import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestActions } from 'actions';
import AgencyComponentFinder from 'components/agency_component_finder';
import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import AgenciesByCategory from 'components/agencies_by_category';
import AgenciesByAlphabet from 'components/agencies_by_alphabet';
import agencyComponentStore from '../stores/agency_component';

class LandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: null,
      agencyComponent: null,
      agencyComponentsForAgency: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.agencyFinderDataComplete) {
      return;
    }
    this.consultQueryString(nextProps);
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

  consultQueryString(props) {
    // We only want to do this one time.
    if (this.queryStringConsulted) {
      return;
    }
    this.queryStringConsulted = true;

    const {
      typeQueryString,
      idQueryString,
    } = props;

    if (typeQueryString === 'agency') {
      const agency = agencyComponentStore.getAgency(idQueryString);
      const agencyComponentsForAgency =
        agencyComponentStore.getAgencyComponentsForAgency(agency.id);
      this.setStateForAgency(agency, agencyComponentsForAgency);
      this.scrollToAgencyFinder();
    }
    if (typeQueryString === 'component') {
      const component = agencyComponentStore.getAgencyComponent(idQueryString);
      const agency = agencyComponentStore.getAgency(component.agency.id);
      this.setStateForComponent(component, agency.isCentralized());
      this.scrollToAgencyFinder();
    }
  }

  // Recursively traverse up the DOM to figure out the scroll offset
  scrollOffset(element) {
    return element.offsetParent ?
      element.offsetTop + this.scrollOffset(element.offsetParent) :
      element.offsetTop;
  }

  scrollToAgencyFinder() {
    window.scrollTo(0, this.scrollOffset(this.agencyFinderElement));
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

      // Scroll to back to the agency finder
      this.scrollToAgencyFinder();

      if (agencyComponent.type === 'agency_component') {
        fetchAgencyComponent(agencyComponent.id)
          .then(component => this.setStateForComponent(component, false));
        return;
      }

      const agency = agencyComponentStore.getAgency(agencyComponent.id);

      // Treat centralized agencies as components
      if (agency.isCentralized()) {
        const component = agencyComponentStore
          .getState()
          .agencyComponents
          .find(c => c.agency.id === agency.id);
        fetchAgencyComponent(component.id)
          .then(c => this.setStateForComponent(c, true));
        return;
      }

      const agencyComponentsForAgency =
        agencyComponentStore.getAgencyComponentsForAgency(agency.id);
      this.setStateForAgency(agency, agencyComponentsForAgency);
    };

    const {
      agencies,
      agencyComponents,
      agencyFinderDataComplete,
      agencyFinderDataProgress,
    } = this.props;

    return (
      <div className="usa-grid">
        <h2 className="agency-component-search_hed">
          Select an agency to start your request or to see an agency’s contact information:
        </h2>
        <div ref={(e) => { this.agencyFinderElement = e; }}>
          <AgencyComponentFinder
            agencies={agencies}
            agencyComponents={agencyComponents}
            agencyFinderDataComplete={agencyFinderDataComplete}
            agencyFinderDataProgress={agencyFinderDataProgress}
            onAgencyChange={agencyChange}
          />
        </div>
        {
          this.state.agencyComponent &&
          <AgencyComponentPreview
            agencyComponent={this.state.agencyComponent.toJS()}
            isCentralized={this.state.isCentralized}
            onAgencySelect={agencyChange}
          />
        }
        {
          this.state.agency &&
          <AgencyPreview
            agency={this.state.agency}
            agencyComponentsForAgency={this.state.agencyComponentsForAgency}
            onAgencySelect={agencyChange}
          />
        }
        {
          false &&
          <AgenciesByCategory
            agencies={agencies}
            agencyFinderDataComplete={agencyFinderDataComplete}
            onAgencySelect={agencyChange}
          />
        }
        {
          <AgenciesByAlphabet
            agencies={agencies}
            agencyFinderDataComplete={agencyFinderDataComplete}
            onAgencySelect={agencyChange}
          />
        }
        {
          !this.state.agencyComponent && !this.state.agency &&
          <div>
            <h3 className="agency-component-search_hed">When choosing an agency</h3>
            <p>Remember that some agencies can’t yet receive FOIA requests
              through FOIA.gov. For those agencies, this site   will provide
              you with the information you need to submit a request directly to
              the agency.</p>
          </div>
        }
      </div>
    );
  }
}

LandingComponent.propTypes = {
  agencies: PropTypes.object.isRequired,
  agencyComponents: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
  onChangeUrlQueryParams: PropTypes.func.isRequired,
};

LandingComponent.defaultProps = {
  agencyFinderDataProgress: 0,
  idQueryString: null,
  typeQueryString: null,
};


export default LandingComponent;
