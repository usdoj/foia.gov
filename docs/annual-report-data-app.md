# Annual FOIA Report Data app

The Annual FOIA Report Data app is a ReactJS application which powers the
Create a Report functionality located at `data.html`.

The app uses the same architecture as the [Request app](request-app.md).

## Application Structure


### Entry point

`/js/annual_report_data.jsx`

This is the main entry point for the application. The application contains a 
`Routeer` component and creates a browser history object which is passed to the 
router. The router wraps the `AnnualReportDataPage` Flux container which drives 
the application.


### Page

`/js/pages/annual_report_data.jsx`

The `AnnualReportDataPage` component is the component which is responsible for 
managing the application. It is implemented as a flux container with a router. 
The `withProps` parameter is passed to the Container create to allow
the history object to be passed to it as a prop.
```
export default withRouter(Container.create(AnnualReportDataPage, {
  withProps: true,
}));
```

Usage in application entry point:
```
import { createBrowserHistory } from 'history';
import AnnualReportDataPage from 'pages/annual_report_data';

const history = createBrowserHistory();
history.push('/data.html', { view: 'form' });

render(
  <Router history={history}>
    <AnnualReportDataPage />
  </Router>,
  document.getElementById('annual-report-data-react-app'),
);
```


### Stores

The following data stores are used by the app's Container to maintain state. A 
brief description of each store and its purpose follows.

`/js/stores/annual_report_data_form.js` 

The `AnnualReportDataFormStore` contains the form state for the annual report 
that will be requested.  The state includes the data for each form section, 
validation information, and the submission action for the form (either
view or download). The app renders the appropriate content depending upon what 
`submissionAction`, if any, has been chosen and updates the browser history 
appropriately.
```
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
```

`js/stores/annual_report_fiscal_year.js`

The 'AnnualReportFiscalYearStore' contains the list of fiscal years received 
from the API backend. This list is used to populate the Fiscal Year checkbox 
list on the form.
```
this.state = {
  fiscalYears: new List(),
};
```

`/js/stores/agency_component.js`

The `AgencyComponentStore` is used to populate the available agencies for the 
agency selector. This is a shared data store used by other apps on the site.
```
this.state = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataComplete: false,
  agencyFinderDataProgress: 0,
};
```

`/js/annual_report_data_types.js`

The `AnnualReportDataTypesStore` contains the data types which can be selected 
in Section 2 of the report with the fields associated with each data type. The 
data store uses the local api utility to retrieve a JSON mapping of data
types to fields located at `/api/annual-report-form/report_data_map.json`. The 
fields list for each data type includes configuration for filters, field 
display in reports, and associates the agency overall field with each component 
field.
```
this.state = {
  dataTypes: new OrderedMap(),
  dataTypeOptions: new List(),
};
```

`/js/stores/annual_report.js`

The `AnnualReportStore` contains the results received from the API backend. It 
contains both the JSON API response data and the data converted into a format 
that can be used by the Tabulator table component. A flag indicates when
the data has been received and processed and is ready for rendering.
```
this.state = {
  reports: new Map(),
  reportTables: new Map(),
  reportDataComplete: false,
  reportDataHasRows: false,
  numberOfTypesToProcess: 0,
};
```


### Components


#### Tooltip

A component that uses the tooltip.js library to create a clickable tooltip that can be used to display help text or additional information.

Props include:
* `text`: A string of text that will appear inside the tooltip, which can include some basic HTML elements such as `<p>`, `<span>` or `<a>`.

Example use:

```
import FoiaTooltip from '../components/foia_tooltip';
..
<FoiaTooltip text={'Lorem ipsum dolor.'} />
```

Used in:
 * foia_report_data_type_filter
 * foia_report_form_section_one
 * foia_report_form_section_two
 * foia_report_form_section_three


#### Modal

Props include:
* `triggerText`: The visible text in the button that triggers the modal.
* `ariaLabel`: The aria label for the modal.
* `modalContent`: The content that goes inside the modal.
* `modalAdditionalLink`: Adds an additional, optional link next to the modal's buttons.
* `canSubmit`: Passes a validation function that returns a boolean and disables the submit button if false.
* `onSubmit`: The callback function which will be called by the `onSubmit` event.
* `onClose`: The callback function which will be called by the `onClose` event.

Example use:

 ```
import FoiaModal from '../components/foia_modal';
..
<FoiaModal
  triggerText='Lorem Ipsum'
  ariaLabel='Solor sit amet'
  modalContent={ <div>consectetur adipisicing elit</div> }
  modalAdditionalLink={removeButton}
  canSubmit={this.modalCanSubmit}
  onSubmit={this.handleModalSubmit}
  onClose={this.handleFilterReset}
/>
```

Used in:
 * foia_report_data_type_filter
 * foia_report_form_section_two


#### Agency Component Filter

Wraps the typeahead search component and the "Select Agency Components"
button (and modal).

Props:
 * `agencies`: A map of agencies that can be searched.
 * `agencyComponents`: A list of components that can be searched.
 * `agencyFinderDataComplete`: Whether or not the agencyComponent store is populated.
 * `agencyFinderDataProgress`: The amount of progress made in populating the agencyComponent store.
 * `selectedAgency` : An array of agencies or components that have been selected in the report form.
 * `isDisabled`: A boolean indicating that the field is disabled.
 * `agencyComponentDisplayError`: A boolean indicating that a validation error message
   should be displayed.
 * `fieldsDisplayed`: The number of Agency or Component Name fields displayed, used to
   determine if a remove button should be displayed.

 Example Use:
 ```
import ReportAgencyComponentFilter from '../components/report_agency_component_filter';
...
<ReportAgencyComponentFilter
  key={index} // eslint-disable-line react/no-array-index-key
  agencies={agencies}
  agencyComponents={agencyComponents}
  agencyFinderDataComplete={agencyFinderDataComplete}
  agencyFinderDataProgress={agencyFinderDataProgress}
  selectedAgency={selected}
  agencyComponentDisplayError={agencyComponentDisplayError}
  fieldsDisplayed={fieldsDisplayed}
  isDisabled={this.props.allAgenciesSelected}
/>
```

Used in:
 * FoiaReportFormSectionOne


#### Agency Component Typeahead

The typeahead search input for the annual report form.

Props:
 * `agencies`: A map of agencies that can be searched.
 * `agencyComponents`: A list of components that can be searched.
 * `agencyFinderDataComplete`: Whether or not the agencyComponent store is populated.
 * `agencyFinderDataProgress`: The amount of progress made in populating the agencyComponent store.
 * `selectedAgency` : An array of agencies or components that have been selected in the report form.
 * `isDisabled`: A boolean indicating that the field is disabled.
 * `agencyComponentDisplayError`: A boolean indicating that a validation error message
   should be displayed.

Example Use:
```
import ReportAgencyComponentTypeahead from './report_agency_component_typeahead';
...
<ReportAgencyComponentTypeahead
  agencies={agencies}
  agencyComponents={agencyComponents}
  agencyFinderDataProgress={agencyFinderDataProgress}
  agencyFinderDataComplete={agencyFinderDataComplete}
  isDisabled={isDisabled}
  selectedAgency={selectedAgency}
  agencyComponentDisplayError={agencyComponentDisplayError}
/>
```

Used In:
 * ReportAgencyComponentFilter


#### Add Link

A link whose event handler will dispatch a given event.

Props:
 * `eventType`: The event name to dispatch that data stores will listen for.
   For example, a type from the `types` object in `js/actions/index.js`.
 * `text`: The link text to display.
 * `icon`: Markup that will be rendered in the link, prior to text.
 * `iconColor`: Accepts the values, `dark` or `light` to indicate the
   wrapper class to use of `use-dark-icons` or `use-light-icons`.
 * `classes`: Accepts an array of strings that will overwrite the wrapper
   element classes.

Example Use:
```
import AddLink from './add_link';
import { types } from '../actions';
...
<AddLink
  eventType={types.SELECTED_AGENCIES_APPEND_BLANK}
  text="Add Another Agency or Component"
  icon: (<span className="icon-plus" />),
  iconColor: 'dark',
  classes: ['touch-safe__wrapper'],
/>
```

Used in:
 * FoiaReportFormSectionOne
 * FoiaReportFormSectionTwo


#### Remove Link

A link whose event handler will dispatch an event specific to a given
selected form state element, such as a selected agency or selected data type.

Props:
 * `eventType`: The event name to dispatch that data stores will listen for.
   For example, a type from the `types` object in `js/actions/index.js`.
 * `text`: The link text to display.
 * `selection`: The previously selected item that should be removed from
   the form state if this link is clicked.

Example Use:
```
import RemoveLink from './remove_link';
import { types } from '../actions/report';
...
<RemoveLink
  eventType={types.ANNUAL_REPORT_AGENCY_COMPONENT_REMOVE}
  selection={this.props.selectedAgency}
  text="Remove"
/>
```

Used in:
 * ReportAgencyComponentFilter
 * FoiaReportDataTypeFilter


#### FOIA Report Data Type Filter

A component which encapsulates the Report Type select list and the data filter
modal. The component is meant to be included in a loop for each selected data
type.

Props:
 * `dataTypes`: The Ordered Map of data types (ex. Requests) keyed by the field 
  group name.
 * `dataTypeOptions`: The List object which contains the value/label pairs 
  which should be added to the data type select field.
 * `selectedDataType`: The object corresponding to the currently selected data type.

Example Use:
```
import FoiaReportDataTypeFilter from './foia_report_data_type_filter';
...
{selectedDataTypes.map((selected, index) => (
  <FoiaReportDataTypeFilter
    key={index}
    dataTypes={dataTypes}
    dataTypeOptions={dataTypeOptions}
    selectedDataType={selected}
  />))}
```

The Report Data Type Filter section calls `FoiaModal` with the form state for
the currently selected data type. Upon a valid modal submit, the form state for
the selected data type's filter object is updated with the values entered in the
form, and the filter object's `applied` property is set to `true`.

The user may choose to remove a previously saved filter by clicking 
`Edit Results Filter` and clicking `Remove Filter` in the modal. This will set 
the `filter` property on the selected data type back to the default values and
set the `applied` property on the filter to `false`.


#### Foia Report Form Section One

A wrapper for the first section of the FOIA report form in which a user can
select one or more Agencies or Components.  The component handles displaying
a `ReportAgencyComponentFilter` for each selected agency, an
"Add Another Agency or Component" link for users to select multiple agencies,
and a "Select All Agencies" link as a shortcut for users that want to see data
for all agencies.

Props:
 * `agencies`: A map of agencies that can be searched.
 * `agencyComponents`: A list of components that can be searched.
 * `agencyFinderDataComplete`: Whether or not the agencyComponent store is populated.
 * `agencyFinderDataProgress`: The amount of progress made in populating the agencyComponent store.
 * `selectedAgencies` : An array of agency or component objects that have been selected in the report form.
   Agency objects include a `components` property which is an array of the agency's child components.
   Component objects include an `agency` property which contains the parent agency information.
 * `agencyComponentDisplayError`: A boolean indicating that a validation error message
    should be displayed.
 * `allAgenciesSelected`: A boolean indicating whether or not the user has selected to view data
   for all agencies.

Example Use:
```
<FoiaReportFormSectionOne
  agencies={agencies}
  agencyComponents={agencyComponents}
  agencyFinderDataComplete={agencyFinderDataComplete}
  agencyFinderDataProgress={agencyFinderDataProgress}
  selectedAgencies={selectedAgencies}
  agencyComponentDisplayError={agencyComponentDisplayError}
  allAgenciesSelected={allAgenciesSelected}
/>
```

Used in:
 * AnnualReportDataPage


#### Foia Report Form Section Two

A wrapper for the second section of the FOIA report form in which a user can
select one or more data types and add filters to the report.  The component
handles displaying a `FoiaReportDataTypeFilter` for each selected data type
and an "Add Another Data Type" link that allows users to add up to three data
types.

Props:
 * `dataTypes`: A map of all the data types available for selection and information
   about each type including the fields in that type and which fields are filterable.
   See `www.foia.gov/api/annual-report-form/report_data_map.json` for more information
   about each type.
 * `dataTypeOptions`: A list data type objects that include a value and label which
   is passed down to the `USWDSSelectWidget` in order to build the data types select field.
 * `selectedDataTypes`: An array of objects for data types that have been selected on the form.
 * `dataTypeDisplayError`: A boolean indicating that a validation error message
    should be displayed.

Example Use:
```
<FoiaReportFormSectionTwo
  dataTypes={dataTypes}
  dataTypeOptions={dataTypeOptions}
  selectedDataTypes={selectedDataTypes}
  dataTypeDisplayError={dataTypeDisplayError}
/>
```

Used in:
 * AnnualReportDataPage


#### Foia Report Form Section Three

The third section of the FOIA report form in which a user can select one or more
fiscal years for which they would like to see report data.  The component
displays a checkbox list of fiscal years, as well as "Select All" and "Select None"
convenience links.

Props:
 * `fiscalYears`: An array of all fiscal years available for selection.
 * `selectedFiscalYears`: An array of the fiscal years that have been selected.
 * `fiscalYearsDisplayError`:  A boolean indicating that a validation error message
    should be displayed.

Example Use:
```
<FoiaReportFormSectionThree
  fiscalYears={[2019, 2018, 2017]}
  selectedFiscalYears={[2019]}
  fiscalYearsDisplayError={false}
/>
```

Used in:
 * AnnualReportDataPage


#### USWDS Select Widget

A simple component which can be used to create a select list of items which
supports a placeholder value and an `onChange` handler. The component will not
display a placeholder if and empty string is passed in the `placeholder` prop. 
The label can be suppressed by passing an empty string for the `title` prop.

Props:
 * `name`: The name property of the select.
 * `title`: The text which appears in the label.
 * `id`: The id of the select field.
 * `value`: The value which should be selected.
 * `handleChange`: The callback function which will be called by the `onChange` event.
 * `options`: A List object of {value/label} pairs which populate the select options.
 * `placeholder`: The text which should appear in the option with no value.
 
 Example Use:
 ```
<USWDSSelectWidget
  name="data_type"
  title="Data Type"
  id={`data-type-${this.state.id}`}
  value={this.props.selectedDataType.id}
  options={this.props.dataTypeOptions}
  handleChange={this.handleChange}
/>
```


### FOIA Report Results Table

A component which wraps the `Tabulator` Javascript table library. It is responsible for displaying and downloading
report tables. One component will be rendered for each data type selected in the form.

Props:
 * `tableData`: An array of data rows to output in the table.
 * `tableColumns`: An array of column headers to output in the table.
 * `tableHeader`: The title which displays for each table; it is also used to generate the CSV filename.
 * `displayMode`: A string which determines how the table should be output; valid values are `view` and `download`.
 * `tableId`: A unique string that provides the ID attribute on the table (tabulator) element,

Example use:
```
<FoiaReportResultsTable
  key={`report-${table.id}`}
  ref={(ref) => { this.reportRefs[table.id] = ref; }}
  tableHeader={table.header}
  tableData={table.data}
  tableColumns={table.columns}
  displayMode={submissionAction}
  tableId={`report-${table.id}`}
/>
```

Used in:
 * annual_report_data


#### Foia Report Form Checkbox Widget

Props include:
* `value`: Used as the checkbox input's name, ID and value as well as the label if no options.label is provided.
* `onChange`: The callback function which will be called by the `onChange` event.
* `checked`: A boolean value that determines if the checkbox should be checked when the page loads. Defaults to `false`.
* `options`: An object that takes an item with the key `label`, which will override the value as the checkbox input's label.

Example use:

 ```
import FoiaReportFormCheckboxWidget from '../../components/foia_report_form_checkbox_widget';
..
<FoiaReportFormCheckboxWidget
  checked
  value={checkedOptionValue}
  onChange={onChangeHandler}
  options: { title: 'Lorem Ipsum' },
/>
```

Used in:
 * foia_report_form_section_three


#### Foia Report Data Submit

Props include
* `selectedDataTypes`: An array of the currently selected DataTypes.
* `fiscalYearsIsValid`: A boolean value indicating whether the Fiscal Years field is valid.
* `dataTypesIsValid`: A boolean value indicating whether the Data Type field is valid.
* `agencyComponentIsValid`:  A boolean value indicating whether the Agency Component field is valid.
* `history`: An object that contains the browser history.

Example use:

```
import FoiaReportDataSubmit from '../components/foia_report_submit';
..
<FoiaReportDataSubmit
  selectedDataTypes={selectedDataTypes}
  agencyComponentIsValid={agencyComponentIsValid}
  dataTypesIsValid={dataTypesIsValid}
  fiscalYearsIsValid={fiscalYearsIsValid}
  onClick={this.triggerCSV.bind(this)}
  history={this.props.history}
/>
```

Used in:
 * annual_report_data


### Utilities


#### FoiaAnnualReportFilterUtilities

A utility class with static methods that can be used to compare
results field values to filter values, removing rows that don't
pass any of the applied filters.

Example use:
```
import FoiaAnnualReportFilterUtilities from 'utils/foia_annual_report_filter_utilities';
...
const filtered = FoiaAnnualReportFilterUtilities.filter(
  rows,
  FoiaAnnualReportFilterUtilities.getFiltersForType(dataType.id),
);
```


#### FoiaAnnualReportRequestBuilder

A utility class to facilitate building requests to the
`/api/annual_foia_report` endpoint.  It adds convenience methods
on top of the JsonApi class that simplify transforming form values
such as selected agencies, data types, or fiscal years, into
parameters on the api request.

Example use:

```
import FoiaAnnualReportRequestBuilder from 'utils/foia_annual_report_request_builder.js';
...
const builder = new FoiaAnnualReportRequestBuilder();

builder
  .includeOverallFields({id: 'data_type_id'})
  .includeDataTypes({id: 'data_type_id'})
  .addOrganizationsGroup({
    agencies: ['DOJ', 'DOC'],
    components: ['OIG', 'OIP'],
  })
  .addDataTypeFiltersGroup([{
    op: 'greater_than',
    filterField: 'field_admin_app_viia.field_sim_med.value',
    compareValue: 10,
  }], 'data_type_id')
  .addFiscalYearsGroup([2018, 2019])
  .request
  .paginate('/annual_foia_report', reportActions.receiveAnnualReportData)
  .then(reportActions.completeAnnualReportData);
```


#### FoiaAnnualReportUtilities

A utility class with static methods that can be used to get an
array of data objects, suitable to be passed to tabulator,
from a report that include the data specified by the included
fields in the report_data_map.json file.

Example use:
```
import FoiaAnnualReportUtilities from 'utils/foia_annual_report_utilities';
...
const rows = FoiaAnnualReportUtilities.getDataForType(report, dataType);
```
