import { create } from 'zustand';
import { List, Map } from 'immutable';
import { Agency, AgencyComponent } from '../models';
import jsonapi from '../util/json_api';
import agencyComponentStore from './agency_component';

// In order to show progress of the agency finder, we need to know the total
// number of agency components we're waiting for. We don't have that number, so
// we hard-code a guess. It's not a huge deal if it's wrong as long as we clip
// the progress to 100%. Worse case it jumps from x% to loaded e.g. 90% to
// loaded or, it sits on 100% for longer than it should.
const GUESS_TOTAL_AGENCY_COMPONENTS = 400;

const initialAgencyState = {
  initCalled: false,
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataComplete: false,
  agencyFinderDataProgress: 0,
  datums: [],
};

const collator = new Intl.Collator('en');

function buildDatums({ agencies, agencyComponents }) {
  // Keep an index of centralized agencies for quick lookup
  /** @type {Record<string, true>} */
  const centralizedAgencyIndex = {};

  return agencies
    .map((agency) => {
      if (agency.isCentralized()) {
        // Warning: Side-effect
        // Add the agency to the index of centralized agencies
        centralizedAgencyIndex[agency.id] = true;
      }

      // Add a title property for common displayKey
      return { ...agency.toJS(), title: agency.name };
    })
    .toJS()
    // Include decentralized agency components in typeahead
    .concat(
      agencyComponents.toJS().filter(
        (agencyComponent) => !(agencyComponent.agency.id in centralizedAgencyIndex),
      ),
    )
    .sort((a, b) => collator.compare(a.title, b.title));
}

const useRawAgencyStore = create((
  /** ZustandSet<typeof initialAgencyState> */ set,
  /** ZustandGet<typeof initialAgencyState> */ get,
) => {
  /**
   * @param {List<AgencyComponent>} newAgencyComponents
   */
  function AGENCY_FINDER_DATA_RECEIVE(newAgencyComponents) {
    const { agencies, agencyComponents } = get();

    // Remove agency components with no parent agency. The component was
    // probably created unintentionally and should be ignored.
    const receivedAgencyComponents = newAgencyComponents
      .filter((agencyComponent) => !!agencyComponent.agency && !!agencyComponent.agency.id);

    const updatedAgencies = agencies.withMutations((mutableAgencies) => {
      receivedAgencyComponents
        .map((agencyComponent) => agencyComponent.agency)
        .forEach((agency) => {
          mutableAgencies.update(
            agency.id,
            new Agency(), // not set value
            (existingAgency) => {
              const { component_count } = existingAgency;
              return existingAgency.merge(
                new Agency(agency),
                { component_count: component_count + 1 },
              );
            },
          );
        });
    });

    const updatedAgencyComponents = agencyComponents.concat(
      receivedAgencyComponents.map((agencyComponent) => new AgencyComponent(agencyComponent)),
    );

    // Figure out the progress of our load. Cap it to 100 since we only
    // have a guess at what the total count is.
    const agencyFinderDataProgress = Math.min(
      Math.floor(agencyComponents.size / GUESS_TOTAL_AGENCY_COMPONENTS * 100),
      100,
    );

    set({
      agencies: updatedAgencies,
      agencyComponents: updatedAgencyComponents,
      agencyFinderDataProgress,
    });
  }

  function AGENCY_FINDER_DATA_COMPLETE() {
    set((state) => {
      // Make sure there are no duplicates. This can happen if a specific
      // agency component is fetched before the full list is received.
      const agencyComponents = state.agencyComponents.filter((component, idx, self) => idx === self.findIndex((possibleDuplicate) => possibleDuplicate.id === component.id));

      return ({
        agencyFinderDataComplete: true,
        agencyComponents,
        datums: buildDatums({
          agencies: state.agencies.valueSeq(), // Pull the values, convert to sequence
          agencyComponents,
        }),
      });
    });
  }

  // /**
  //  * @param {AgencyComponent} newAgencyComponent
  //  */
  // function AGENCY_COMPONENT_RECEIVE(newAgencyComponent) {
  //   const state = get();
  //
  //   // Grab existing component from the store, or a new one
  //   const [index, agencyComponent] = state.agencyComponents.findEntry(
  //     (component) => component.id === newAgencyComponent.id,
  //     null,
  //     [undefined, new AgencyComponent()], // Entry does not exist
  //   );
  //
  //   // Parse formFields if they exist
  //   let formFields = [];
  //   if (newAgencyComponent.request_form) {
  //     formFields = AgencyComponent.parseWebformElements(newAgencyComponent.request_form);
  //   }
  //
  //   set({
  //     agencyComponents: state.agencyComponents
  //       .delete(index) // remove the existing component
  //       .push(agencyComponent.merge(
  //         new AgencyComponent({
  //           // Avoid resetting formFields just because they weren't included in the request
  //           formFields: formFields.length ? formFields : agencyComponent.formFields,
  //           ...newAgencyComponent,
  //         }),
  //       )),
  //   });
  // }

  /**
   * @param {object=} includeReferenceFields
   * @param {string[]} includeReferenceFields.agency
   * @param {string[]} includeReferenceFields.agency_component
   * @param {string[]} includeReferenceFields["agency.category"]
   */
  function fetchAgencyFinderData(includeReferenceFields = null) {
    const referenceFields = includeReferenceFields || {
      agency_component: ['title', 'abbreviation', 'agency', 'status'],
      agency: ['name', 'abbreviation', 'description', 'category'],
      'agency.category': ['name'],
    };

    const request = jsonapi.params();
    Object.keys(referenceFields).forEach((field) => {
      if (field !== 'agency_component') {
        request.include(field);
      }
      request.fields(field, referenceFields[field]);
    });

    return request
      .filter('status', 'status', 1)
      .limit(50) // Maximum allowed by drupal
      .paginate('/agency_components', AGENCY_FINDER_DATA_RECEIVE)
      .then(AGENCY_FINDER_DATA_COMPLETE);
  }

  return ({
    ...initialAgencyState,

    // These get methods are unused, but may come in handy building the agency URLs...

    /**
     * @param {string} agencyId
     */
    getAgency(agencyId) {
      return get().agencies.get(agencyId, null);
    },

    /**
     * @param {string} agencyComponentId
     */
    getAgencyComponent(agencyComponentId) {
      return get().agencyComponents
        .find((agencyComponent) => agencyComponent.id === agencyComponentId);
    },

    /**
     * @param {string} agencyId
     */
    getAgencyComponentsForAgency(agencyId) {
      return get().agencyComponents
        .filter((agencyComponent) => agencyComponent.agency.id === agencyId);
    },

    getDatumUrl(datum) {
      if (datum.type === 'agency_component') {
        return `/?${new URLSearchParams({ type: 'component', id: datum.id })}`;
      }

      const agency = get().agencies.get(datum.id);

      if (agency.isCentralized()) {
        const component = get()
          .agencyComponents
          .find((c) => c.agency.id === agency.id);

        return `/?${new URLSearchParams({ type: 'component', id: component.id })}`;
      }

      return `/?${new URLSearchParams({ type: 'agency', id: agency.id })}`;
    },

    init() {
      if (get().initCalled) {
        return;
      }

      set({ initCalled: true });

      // Pre-fetch the list of agencies and components for typeahead
      fetchAgencyFinderData();
    },
  });
});

/**
 * @typedef {object} Datum
 * @property {string} Datum.id
 * @property {string} Datum.title
 * @property {string} Datum.abbreviation
 * @property {string} Datum.type
 * @property {{ id: string; title: string}=} Datum.agency
 */

/**
 * @returns {{
 *   agencies: import('immutable').Map<string, Agency>;
 *   agencyComponents: import('immutable').List<AgencyComponent>;
 *   agencyFinderDataComplete: boolean;
 *   agencyFinderDataProgress: number;
 *   datums: Datum[];
 *   init(): void;
 *   getDatumUrl(datum: Datum): string;
 * }}
 */
function useAgencyStore() {
  return useRawAgencyStore((state) => ({
    ...state,
    getDatumUrl: (datum) => {
      if (datum.type === 'agency_component') {
        return `/?${new URLSearchParams({ type: 'component', id: datum.id })}`;
      }

      const agency = state.agencies.get(datum.id);

      if (agency.isCentralized()) {
        const component = state.agencyComponents
          .find((c) => c.agency.id === agency.id);

        return `/?${new URLSearchParams({ type: 'component', id: component.id })}`;
      }

      return `/?${new URLSearchParams({ type: 'agency', id: agency.id })}`;
    },
  }));
}

export default useAgencyStore;
