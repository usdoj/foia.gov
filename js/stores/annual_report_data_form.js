import { Store } from 'flux/utils';
import { List } from 'immutable';

import dispatcher from '../util/dispatcher';
import { types } from '../actions/report';
import agencyComponentStore from './agency_component';
import annualReportDataTypesStore from './annual_report_data_types';

class AnnualReportDataFormStore extends Store {
  constructor(_dispatcher) {
    super(_dispatcher);
    this.state = {
      selectedAgencies: [{ index: 0 }],
      allAgenciesSelected: false,
      selectedDataTypes: [{ index: 0, id: '' }],
      selectedFiscalYears: [],
      fiscalYearsIsValid: false,
      dataTypesIsValid: false,
      agencyComponentIsValid: false,
      fiscalYearsDisplayError: false,
      dataTypeDisplayError: false,
      agencyComponentDisplayError: false,
      submissionAction: false,
    };
  }

  getState() {
    return this.state;
  }

  buildSelectedAgencies() {
    if (!this.state.allAgenciesSelected) {
      return [...this.state.selectedAgencies];
    }

    // If all agencies are selected, get an array of all agencies
    // where the only component is an overall component.
    let { agencies } = agencyComponentStore.getState();
    agencies = agencies.map(agency => (
      Object.assign({}, agency.toJS(), {
        components: List([{
          abbreviation: 'Agency Overall',
          id: `overall:${agency.id}`,
          isOverall: true,
          selected: true,
        }]),
      })
    ));

    return agencies.toArray();
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

      case types.SELECTED_AGENCIES_TOGGLE_SELECT_ALL: {
        const { allAgenciesSelected } = Object.assign({}, this.getState());
        let agencyComponentIsValid = true;
        if (!allAgenciesSelected) {
          const selectedAgencies = [...this.state.selectedAgencies];
          agencyComponentIsValid = selectedAgencies
            .filter(selection => selection.error || false)
            .length === 0;
        }

        Object.assign(this.state, {
          allAgenciesSelected: !allAgenciesSelected,
          agencyComponentIsValid,
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

      case types.ANNUAL_REPORT_AGENCY_COMPONENT_REMOVE: {
        const { selection } = payload;
        const selectedAgencies = [...this.state.selectedAgencies];
        // Remove the Agency Component whose index matches the object's index property.
        selectedAgencies.splice(selection.index, 1);
        // Reset the index number for the remaining objects.
        selectedAgencies.forEach((selectedAgency, index) => {
          selectedAgency.index = index;
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
        const selectedIsValid = typeof selectedDataType === 'object'
          && Object.prototype.hasOwnProperty.call(selectedDataType, 'index');

        if (!selectedIsValid || !previousIsValid) {
          break;
        }

        if (selectedDataType.id === previousDataType.id) {
          break;
        }
        if (selectedDataType.id !== '') {
          selectedDataType.fields = annualReportDataTypesStore
            .getFieldsForDataType(selectedDataType.id);
          selectedDataType.heading = annualReportDataTypesStore
            .getPrettyLabelForDataType(selectedDataType.id);

          selectedDataType.filterOptions = selectedDataType
            .fields
            .filter(opt => opt.filter)
            .map(opt => ({
              value: opt.filter === true ? opt.id : opt.filter,
              label: opt.label,
            }));
          // Add a default filter definition to make removing a submitted filter
          // easier. This will replace the applied filter if the user chooses to
          // remove a filter.
          const filterDefaults = {
            applied: false,
            filterField: selectedDataType.filterOptions[0].value,
            op: 'greater_than',
            compareValue: '',
          };
          selectedDataType.defaultFilter = filterDefaults;
          selectedDataType.filter = Object.assign({}, filterDefaults);
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

      case types.REPORT_SUBMISSION_TYPE: {
        const { submissionAction } = payload;
        Object.assign(this.state, {
          submissionAction,
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

      case types.VALIDATE_FORM: {
        const selectedAgencies = [...this.state.selectedAgencies];
        const dataTypes = [...this.state.selectedDataTypes];
        const fiscalYears = [...this.state.selectedFiscalYears];
        const validityCheckSelectedAgencies = [];
        const validityCheckDataTypes = [];

        // Check if Agency Component field is valid.
        selectedAgencies.forEach((selectedAgency) => {
          if (selectedAgency.id) {
            validityCheckSelectedAgencies.push(true);
          } else {
            validityCheckSelectedAgencies.push(false);
          }
        });
        const agencyComponentIsValid = validityCheckSelectedAgencies.includes(true);

        // Check if Data Type field is valid.
        dataTypes.forEach((dataType) => {
          if (dataType.id.length > 0) {
            validityCheckDataTypes.push(true);
          } else {
            validityCheckDataTypes.push(false);
          }
        });
        const dataTypesIsValid = validityCheckDataTypes.includes(true);

        // Check if Fiscal Years field is valid.
        const fiscalYearsIsValid = fiscalYears.length > 0;

        Object.assign(this.state, {
          agencyComponentDisplayError: !agencyComponentIsValid,
          dataTypeDisplayError: !dataTypesIsValid,
          fiscalYearsDisplayError: !fiscalYearsIsValid,
          fiscalYearsIsValid,
          dataTypesIsValid,
          agencyComponentIsValid,
        });
        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FILTER_UPDATE: {
        const { currentSelection, filter } = payload;
        const selectedDataTypes = [...this.state.selectedDataTypes];
        if (!(typeof currentSelection === 'object' && Object.prototype.hasOwnProperty.call(currentSelection, 'index'))) {
          break;
        }
        // Get a copy of the filter so we aren't updating the real one until
        // the user submits the modal.
        const tempFilter = currentSelection.tempFilter ?
          Object.assign({}, currentSelection.tempFilter) :
          Object.assign({}, currentSelection.filter);
        Object.assign(tempFilter, {
          applied: true,
        });
        tempFilter[filter.name] = filter.value;

        selectedDataTypes[currentSelection.index].tempFilter = tempFilter;
        Object.assign(this.state, {
          selectedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FILTER_SUBMIT: {
        const { index } = payload;
        const selectedDataTypes = [...this.state.selectedDataTypes];
        const dataType = Object.assign({}, selectedDataTypes[index]);

        if (!Object.prototype.hasOwnProperty.call(dataType, 'tempFilter')) {
          break;
        }

        dataType.filter = dataType.tempFilter;
        delete dataType.tempFilter;

        selectedDataTypes.splice(index, 1, dataType);

        Object.assign(this.state, {
          selectedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FILTER_RESET: {
        const { index } = payload;
        const selectedDataTypes = [...this.state.selectedDataTypes];
        const dataType = Object.assign({}, selectedDataTypes[index]);

        if (!Object.prototype.hasOwnProperty.call(dataType, 'tempFilter')) {
          break;
        }
        delete dataType.tempFilter;

        selectedDataTypes.splice(index, 1, dataType);

        Object.assign(this.state, {
          selectedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FILTER_REMOVE: {
        const { selection } = payload;
        const selectedDataTypes = [...this.state.selectedDataTypes];
        // Assign a copy of the default filter object to the filter.
        const tempFilter = Object.assign({}, selection.defaultFilter);
        selection.filter = tempFilter;

        selectedDataTypes[selection.index].filter = tempFilter;

        Object.assign(this.state, {
          selectedDataTypes,
        });

        this.__emitChange();
        break;
      }

      case types.ANNUAL_REPORT_DATA_TYPE_FIELD_REMOVE: {
        const { selection } = payload;
        const selectedDataTypes = [...this.state.selectedDataTypes];

        // Remove the Data Type whose index matches the object's index property.
        selectedDataTypes.splice(selection.index, 1);

        // Reset the index number for the remaining objects.
        selectedDataTypes.forEach((selectedDataType, index) => {
          selectedDataType.index = index;
        });

        Object.assign(this.state, {
          selectedDataTypes,
        });

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

      case types.SELECTED_AGENCY_COMPONENT_TEMPORARY_UPDATE_ALL: {
        // Assigns agencyComponent selections to a temporary property on the
        // agency that is being updated.  This allows the changes to be committed
        // later when the user clicks "Submit" or to be discarded if the user clicks
        // "Cancel".
        const { selectValue, agency } = payload;
        const selectedAgencies = [...this.state.selectedAgencies];

        // Get a copy of the current components or tempSelectedComponents list
        // so that we don't directly update those lists.
        let components = selectedAgencies[agency.index].tempSelectedComponents
          ? selectedAgencies[agency.index].tempSelectedComponents.toList()
          : selectedAgencies[agency.index].components.toList();

        // Update the temporary components list with a cloned agency component
        // object where all select values are toggled.
        components.map((item) => {
          components = components.set(
            components.findIndex(component => component.id === item.id),
            Object.assign({}, item, { selected: selectValue }),
          );
          return components;
        });

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
