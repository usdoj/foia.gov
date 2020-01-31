import { Store } from 'flux/utils';
import { List, Map } from 'immutable';

import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';
import agencyComponentStore from './agency_component';

class AnnualReportDataFormStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);
    this.state = {
      selectedAgencies: [{ index: 0 }],
      selectedDataTypes: [{ index: 0, id: '' }],
      selectedDataTypeFilters: [{ index: 0 }],
      selectedFiscalYears: [],
    };
  }

  getState() {
    return this.state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
      case types.SELECTED_AGENCIES_UPDATE: {
        const { selectedAgency, previousAgency } = payload;
        const previousIsValid = typeof previousAgency === 'object'
          && Object.prototype.hasOwnProperty.call(previousAgency, 'index');
        const selectedIsValid = typeof selectedAgency === 'object'
          && Object.prototype.hasOwnProperty.call(selectedAgency, 'index');

        if (!selectedIsValid || !previousIsValid) {
          break;
        }

        // Ensure that we don't overwrite previous state if someone selects the same
        // agency in the same field for some reason, presumably accidentally.
        if (selectedAgency.id === previousAgency.id) {
          break;
        }

        if (selectedAgency.type === 'agency') {
          selectedAgency.components = agencyComponentStore
            .getAgencyComponentsForAgency(selectedAgency.id)
            .map(component => ({
              abbreviation: component.abbreviation,
              id: component.id,
              isOverall: false,
              selected: true,
            }))
            // Components with the same abbreviation as the agency must not be displayed
            // as an option to select as a child of a selected agency.  These will instead be
            // replaced by the Agency Overall option.
            .filter(component => component.abbreviation !== selectedAgency.abbreviation)
            .push({
              abbreviation: 'Agency Overall',
              id: `overall:${selectedAgency.id}`,
              isOverall: true,
              selected: true,
            });
        }

        // Get a copy of the selected agencies state so that we don't
        // mutate state.  Directly mutating the state prevents
        // a rerender from firing, which causes multiple problems.
        const selectedAgencies = [...this.state.selectedAgencies];
        selectedAgencies.splice(previousAgency.index, 1, selectedAgency);

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }

      case types.SELECTED_AGENCIES_APPEND_BLANK: {
        const selectedAgencies = [...this.state.selectedAgencies];
        selectedAgencies.push({
          index: (selectedAgencies.length),
        });

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_UPDATE: {
        const { selectedDataType, previousDataType } = payload;
        const previousIsValid = typeof previousDataType === 'object'
          && Object.prototype.hasOwnProperty.call(previousDataType, 'index');
        const selectedIsValid = typeof previousDataType === 'object'
          && Object.prototype.hasOwnProperty.call(previousDataType, 'index');

        if (!selectedIsValid || !previousIsValid) {
          break;
        }

        const selectedDataTypes = [...this.state.selectedDataTypes];
        selectedDataTypes.splice(previousDataType.index, 1, selectedDataType);
        Object.assign(this.state, {
          selectedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FILTER_ADD_GROUP: {
        const currentSelectedDataTypes = [...this.state.selectedDataTypes];
        currentSelectedDataTypes.push({
          index: (currentSelectedDataTypes.length),
          id: '',
        });
        Object.assign(this.state, {
          selectedDataTypes: currentSelectedDataTypes,
        });
        this.__emitChange();
        break;
      }

      case types.SELECTED_FISCAL_YEARS_UPDATE: {
        const { data } = payload;
        if (!Array.isArray(data)) {
          break;
        }

        Object.assign(this.state, { selectedFiscalYears: data });
        this.__emitChange();
        break;
      }

      case types.SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE: {
        // Assigns agencyComponent selections to a temporary property on the
        // agency that is being updated.  This allows the changes to be committed
        // later when the user clicks "Submit" or to be discarded if the user clicks
        // "Cancel".
        const { agencyComponent, agency } = payload;
        const selectedAgencies = [...this.state.selectedAgencies];

        // Get a copy of the current components or tempSelectedComponents list
        // so that we don't directly update those lists.
        let components = selectedAgencies[agency.index].tempSelectedComponents
          ? selectedAgencies[agency.index].tempSelectedComponents.toList()
          : selectedAgencies[agency.index].components.toList();

        // Update the temporary components list with a cloned agency component
        // object where the select value is toggled.
        components = components.set(
          components.findIndex(component => component.id === agencyComponent.id),
          Object.assign({}, agencyComponent, { selected: !agencyComponent.selected }),
        );

        selectedAgencies[agency.index].tempSelectedComponents = components;

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }

      case types.SELECTED_AGENCY_COMPONENTS_MERGE_TEMPORARY: {
        const { index } = payload;
        const selectedAgencies = [...this.state.selectedAgencies];
        const agency = Object.assign({}, selectedAgencies[index]);

        if (!Object.prototype.hasOwnProperty.call(agency, 'tempSelectedComponents')) {
          break;
        }

        // Assign the tempSelectedComponents property to the components property,
        // effectively committing the selections made when updating component selections
        // in the SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE event handler, and get
        // rid of the temporary list of selected components, to avoid confusion on what
        // the current state is.
        agency.components = agency.tempSelectedComponents;
        delete agency.tempSelectedComponents;

        selectedAgencies.splice(index, 1, agency);

        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }

      case types.SELECTED_AGENCY_COMPONENTS_DISCARD_TEMPORARY: {
        const { index } = payload;
        const selectedAgencies = [...this.state.selectedAgencies];
        const agency = Object.assign({}, selectedAgencies[index]);

        if (!Object.prototype.hasOwnProperty.call(agency, 'tempSelectedComponents')) {
          break;
        }

        // Discard any changes being held.
        delete agency.tempSelectedComponents;
        selectedAgencies.splice(agency.index, 1, agency);
        Object.assign(this.state, {
          selectedAgencies,
        });
        this.__emitChange();
        break;
      }
      default:
        break;
    }
  }
}

const annualReportDataFormStore = new AnnualReportDataFormStore(dispatcher);
export default annualReportDataFormStore;

export {
  AnnualReportDataFormStore,
};
