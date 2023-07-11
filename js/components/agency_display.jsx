import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import agencyComponentStore from '../stores/agency_component';
import { pushUrl } from '../util/use_url';
import { requestActions } from '../actions';

function jumpToUrl(id, type) {
  const params = new URLSearchParams({ id, type });
  pushUrl(`?${params}`);
}

/**
 * Load and display an Agency or Agency Component and allow navigation
 * between them.
 */
class AgencyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      type: '',
      agency: null,
      agencyComponent: null,
      agencyComponentsForAgency: null,
      notFound: false,
      isCentralized: false,
    };
  }

  componentDidMount() {
    this.checkLoaded();
  }

  componentDidUpdate() {
    this.checkLoaded();
  }

  checkLoaded() {
    const { id, type, agencyFinderDataComplete } = this.props;
    if (!agencyFinderDataComplete) {
      return;
    }

    if (this.state.id === id && this.state.type === type) {
      // Already loaded this entity
      return;
    }

    try {
      switch (type) {
        case 'agency': {
          const agency = agencyComponentStore.getAgency(id);
          const agencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(agency.id);
          this.setStateForAgency(agency, agencyComponentsForAgency);
          break;
        }
        case 'component': {
          // Not clear why this is required and no one remembers flux in 2023.
          setTimeout(() => {
            requestActions.fetchAgencyComponent(id)
              .then(requestActions.receiveAgencyComponent)
              .then(() => {
                const component = agencyComponentStore.getAgencyComponent(id);
                const agency = agencyComponentStore.getAgency(component.agency.id);
                this.setStateForComponent(component, agency.isCentralized());
              });
          }, 0);
          break;
        }
        default:
          this.setState({ notFound: true });
      }
    } catch (err) {
      console.error(err);
      this.setState({ notFound: true });
    }
  }

  setStateForAgency(agency, agencyComponentsForAgency) {
    this.setState({
      agency,
      agencyComponent: null,
      agencyComponentsForAgency,
      id: agency.id,
      type: 'agency',
      notFound: false,
    });
  }

  setStateForComponent(agencyComponent, isCentralized = false) {
    this.setState({
      agency: null,
      agencyComponent,
      agencyComponentsForAgency: null,
      isCentralized,
      id: agencyComponent.id,
      type: 'component',
      notFound: false,
    });
  }

  render() {
    // Note that the agencyComponent comes from two different sources, so the
    // properties might not be consistent.
    const agencyChange = (agencyComponent) => {
      // We're going to push a URL and let the component load it.
      if (agencyComponent.type === 'agency_component') {
        jumpToUrl(agencyComponent.id, 'component');
        return;
      }

      const agency = agencyComponentStore.getAgency(agencyComponent.id);

      // Treat centralized agencies as components
      if (agency.isCentralized()) {
        const component = this.props.agencyComponents.find((c) => c.agency.id === agency.id);
        jumpToUrl(component.id, 'component');
        return;
      }

      jumpToUrl(agency.id, 'agency');
    };

    const {
      agency, agencyComponent, agencyComponentsForAgency, isCentralized, notFound,
    } = this.state;

    const searchPath = '/agency-search.html';

    return (
      <div className="usa-grid agency-preview">
        <p>
          <a
            href={searchPath}
            className="agency-preview_back"
            onClick={(e) => {
              e.preventDefault();
              pushUrl(searchPath);
            }}
          >
            Agency Search
          </a>
        </p>

        {notFound && (<h2>This agency could not be found.</h2>)}

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

AgencyDisplay.propTypes = {
  agencyComponents: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default AgencyDisplay;
