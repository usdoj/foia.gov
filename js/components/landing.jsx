import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { requestActions } from 'actions';
import AgencyComponentPreview from 'components/agency_component_preview';
import AgencyPreview from 'components/agency_preview';
import AgenciesByAlphabet from 'components/agencies_by_alphabet';
import agencyComponentStore from '../stores/agency_component';

function LandingComponent({
  agencies,
  agencyFinderDataComplete,
  onChangeUrlQueryParams,
  idQueryString = null,
  typeQueryString = null,
}) {
  const [showHome, setShowHome] = useState(typeQueryString === null);
  const [agency, setAgency] = useState(null);
  const [agencyComponent, setAgencyComponent] = useState(null);
  const [agencyComponentsForAgency, setAgencyComponentsForAgency] = useState(null);
  const [isCentralized, setIsCentralized] = useState(false);

  useEffect(() => {
    const method = showHome ? 'show' : 'hide';
    $('#main > .usa-hero, #learn-more')[method]();
  }, [showHome]);

  // Store state without re-rendering.
  const fakeThis = useRef({
    queryStringConsulted: false,
  }).current;

  function setStateForAgency(newAgency, newAgencyComponentsForAgency) {
    setAgency(newAgency);
    setAgencyComponent(null);
    setAgencyComponentsForAgency(newAgencyComponentsForAgency);

    onChangeUrlQueryParams({
      idQueryString: newAgency.id,
      typeQueryString: 'agency',
    });
  }

  function setStateForComponent(newAgencyComponent, newIsCentralized = false) {
    setAgency(null);
    setAgencyComponent(newAgencyComponent);
    setAgencyComponentsForAgency(null);
    setIsCentralized(newIsCentralized);

    onChangeUrlQueryParams({
      idQueryString: newAgencyComponent.id,
      typeQueryString: 'component',
    });
  }

  function consultQueryString() {
    // We only want to do this one time.
    if (fakeThis.queryStringConsulted) {
      return;
    }
    fakeThis.queryStringConsulted = true;

    if (typeQueryString === 'agency') {
      const newAgency = agencyComponentStore.getAgency(idQueryString);
      const newAgencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(newAgency.id);
      setStateForAgency(newAgency, newAgencyComponentsForAgency);
      setShowHome(false);
    }
    if (typeQueryString === 'component') {
      const component = agencyComponentStore.getAgencyComponent(idQueryString);
      const newAgency = agencyComponentStore.getAgency(component.agency.id);
      setStateForComponent(component, newAgency.isCentralized());
      setShowHome(false);
    }
  }

  useEffect(() => {
    if (!agencyFinderDataComplete) {
      return;
    }

    consultQueryString();
  }, [agencyFinderDataComplete]);

  // Note that the agencyComponent comes from two different sources, so the
  // properties might not be consistent.
  const agencyChange = (newAgencyComponent) => {
    function fetchAgencyComponent(agencyComponentId) {
      return requestActions.fetchAgencyComponent(agencyComponentId)
        .then(requestActions.receiveAgencyComponent)
        .then(() => agencyComponentStore.getAgencyComponent(agencyComponentId));
    }

    setShowHome(false);

    if (newAgencyComponent.type === 'agency_component') {
      fetchAgencyComponent(newAgencyComponent.id)
        .then((component) => setStateForComponent(component, false));
      return;
    }

    const newAgency = agencyComponentStore.getAgency(newAgencyComponent.id);

    // Treat centralized agencies as components
    if (newAgency.isCentralized()) {
      const component = agencyComponentStore
        .getState()
        .agencyComponents
        .find((c) => c.agency.id === newAgency.id);
      fetchAgencyComponent(component.id)
        .then((c) => setStateForComponent(c, true));
      return;
    }

    const newAgencyComponentsForAgency = agencyComponentStore.getAgencyComponentsForAgency(newAgency.id);
    setStateForAgency(agency, newAgencyComponentsForAgency);
  };

  if (showHome) {
    return null;
  }

  // <section className="agency-component-search" id="agency-search">

  return (
    <div className="usa-grid">
      <p>
        <a href="/">Close</a>
      </p>

      {
        agencyComponent
        && (
          <AgencyComponentPreview
            agencyComponent={agencyComponent.toJS()}
            isCentralized={isCentralized}
            onAgencySelect={agencyChange}
          />
        )
      }
      {
        agency
        && (
          <AgencyPreview
            agency={agency}
            agencyComponentsForAgency={agencyComponentsForAgency}
            onAgencySelect={agencyChange}
          />
        )
      }
      <AgenciesByAlphabet
        agencies={agencies}
        agencyFinderDataComplete={agencyFinderDataComplete}
        onAgencySelect={(newAgencyComponent) => {
          agencyChange(newAgencyComponent);
          /** @type {HTMLElement} */
          const el = $('#landing-react-app')[0];
          if (el) {
            el.scrollIntoView();
          }
        }}
      />
      {
        !agencyComponent && !agency
        && (
          <div>
            <h3 className="agency-component-search_hed">When choosing an agency</h3>
            <p>
              Remember that some agencies can’t yet receive FOIA requests
              through FOIA.gov. For those agencies, this site   will provide
              you with the information you need to submit a request directly to
              the agency.
            </p>
          </div>
        )
      }
    </div>
  );
}

LandingComponent.propTypes = {
  agencies: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
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
