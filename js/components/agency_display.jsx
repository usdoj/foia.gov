import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import AgencyRequestWritingTips from 'components/agency_request_writing_tips';
import agencyComponentStore from '../stores/agency_component';
import { pushUrl } from '../util/use_url';
import { titlePrefix } from '../util/dom';
import { requestActions } from '../actions';

function jumpToUrl(id, type) {
  const params = new URLSearchParams({ id, type });
  pushUrl(`?${params}`);
}

function returnUrl(id, type) {
  const params = new URLSearchParams({ id, type });
  return `?${params}`;
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
      showTips: false,
      destinationHref: null,
    };
    this.setShowTips = this.setShowTips.bind(this);
    this.setDestinationHref = this.setDestinationHref.bind(this);
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

    // Load agency or component based on the URL
    try {
      switch (type) {
        case 'agency': {
          const agency = agencyComponentStore.getAgency(id);
          const agencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(agency.id);
          this.setStateForAgency(agency, agencyComponentsForAgency);
          break;
        }
        case 'component': {
          // Not clear why this is required, and few remember flux in 2023.
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

  setDestinationHref(url) {
    this.setState({
      destinationHref: url,
    });
  }

  setShowTips(boolean) {
    this.setState({
      showTips: boolean,
    });
  }

  setStateForAgency(agency, agencyComponentsForAgency) {
    document.title = titlePrefix + agency.name;
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
    const title = isCentralized ? agencyComponent.agency.name : agencyComponent.title;
    document.title = titlePrefix + title;
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
      // We're going to push a URL so checkLoaded() can handle it
      if (agencyComponent.type === 'agency_component') {
        const destinationHref = returnUrl(agencyComponent.id, 'component');
        this.setDestinationHref(destinationHref);
        jumpToUrl(agencyComponent.id, 'component');
        return;
      }

      const agency = agencyComponentStore.getAgency(agencyComponent.id);

      // Treat centralized agencies as components
      if (agency && agency.isCentralized()) {
        const component = this.props.agencyComponents.find((c) => c.agency.id === agency.id);
        const destinationHref = returnUrl(component.id, 'component');
        this.setDestinationHref(destinationHref);
        jumpToUrl(component.id, 'component');
        return;
      }

      if (agency) {
        const destinationHref = returnUrl(agency.id, 'agency');
        this.setDestinationHref(destinationHref);
      }
    };

    const {
      agency, agencyComponent, agencyComponentsForAgency, isCentralized, notFound, destinationHref, showTips,
    } = this.state;

    const searchPath = '/agency-search.html';

    return (
      <div className="usa-grid agency-preview">
        <p>
          <a
            href={searchPath}
            className="agency-preview_back"
            onClick={(e) => {
              // Push URL so we don't have to reload the page.
              e.preventDefault();
              pushUrl(searchPath);
            }}
          >
            Agency Search
          </a>
        </p>

        {notFound && (<h2>This agency could not be found.</h2>)}

        { showTips ? (
          <AgencyRequestWritingTips destinationHref={destinationHref} />
        ) : (
          <>
            {agencyComponent && (
              <AgencyComponentPreview
                agencyComponent={agencyComponent.toJS()}
                isCentralized={isCentralized}
                onAgencySelect={agencyChange}
                setDestinationHref={this.setDestinationHref}
                setShowTips={this.setShowTips}
              />
            )}
            {agency && (
              <AgencyPreview
                agency={agency}
                agencyComponentsForAgency={agencyComponentsForAgency}
                onAgencySelect={agencyChange}
              />
            )}
          </>
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
