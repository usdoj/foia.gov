import { create } from 'zustand';
import { List, Map } from 'immutable';
import { Agency, AgencyComponent } from '../models';
import jsonapi from '../util/json_api';

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

// Expects agencies as a sequence type
function datums({ agencies, agencyComponents }) {
  // Keep an index of centralized agencies for quick lookup
  const centralizedAgencyIndex = {};

  return agencies
    .map((agency) => {
      if (agency.isCentralized()) {
        // Warning: Side-effect
        // Add the agency to the index of centralized agencies
        centralizedAgencyIndex[agency.id] = true;
      }

      // Add a title property for common displayKey
      return Object.assign(agency.toJS(), { title: agency.name });
    })
    .toJS()
    // Include decentralized agency components in typeahead
    .concat(
      agencyComponents.toJS().filter(
        (agencyComponent) => !(agencyComponent.agency.id in centralizedAgencyIndex),
      ),
    );
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
        datums: datums({
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
 * @returns {{
 *   agencies: import('immutable').Map<string, Agency>;
 *   agencyComponents: import('immutable').List<AgencyComponent>;
 *   agencyFinderDataComplete: boolean;
 *   agencyFinderDataProgress: number;
 *   datums: Array<{
 *     id: string;
 *     title: string;
 *     abbreviation: string;
 *     agency?: {
 *       id: string;
 *       title: string;
 *     };
 *     type: string;
 *   }>;
 *   init(): void;
 * }}
 */
function useAgencyStore() {
  return useRawAgencyStore((s) => s);
}

export default useAgencyStore;
