# Annual FOIA Report Data app

The Annual FOIA Report Data app is a ReactJS application which powers the
Create a Report functionality located at `data.html`.

The app uses the same architecture as the [Request app](request-app.md).

## Application Structure

### Entry point
`/js/annual_report_data.jsx`


### Page(s)
`/js/pages/annual_report_data.jsx`


### Actions


### Stores
`/js/stores/annual_report_data_form.js` 

The `AnnualReportDataFormStore` contains the form state for the annual report
that will be requested. It contains a separate section for each report section
on the form the user sees.
```
this.state = {
  selectedAgencies: [{ index: 0 }],
  selectedDataTypes: [{ index: 0, id: '' }],
  selectedFiscalYears: [],
};
```

`/js/stores/annual_report.js`

The `AnnualReportStore` contains the results received from the API backend. It contains both the JSON API response
data and the data converted into a format that can be used by the Tabulator table component. A flag indicates when
the data has been received and processed and is ready for rendering.
```
this.state = {
  reports: new Map(),
  reportTables: new Map(),
  reportDataComplete: false,
};
```


### Components


#### Tooltip

Props include `text`, which is used to pass the paragraph text that needs to go
inside of the tooltip.

Example use:

```
import FoiaTooltip from '../components/foia_tooltip';
..
<FoiaTooltip text={ "Lorem ipsum dolor."} />
```

Used in:
 * foia_report_form_section_two


#### Modal

Props include:
* `triggerText` which is used inside the button that triggers the modal.
* `ariaLabel` which is used as the aria label for the modal.
* `modalContent` which is the content that goes inside the modal.

Example use:

 ```
import FoiaModal from '../components/foia_modal';
..
<FoiaModal
  triggerText='Lorem Ipsum'
  ariaLabel='Solor sit amet'
  modalContent={ <div>consectetur adipisicing elit</div> }
/>
```

Used in:
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

 Example Use:
 ```
import ReportAgencyComponentFilter from '../components/report_agency_component_filter';
...
<ReportAgencyComponentFilter
  agencies={agencies}
  agencyComponents={agencyComponents}
  agencyFinderDataComplete={agencyFinderDataComplete}
  agencyFinderDataProgress={agencyFinderDataProgress}
  selectedAgency={selected}
/>
```

#### Agency Component Typeahead

The typeahead search input for the annual report form.

Props:
 * `agencies`: A map of agencies that can be searched.
 * `agencyComponents`: A list of components that can be searched.
 * `agencyFinderDataComplete`: Whether or not the agencyComponent store is populated.
 * `agencyFinderDataProgress`: The amount of progress made in populating the agencyComponent store.
 * `selectedAgency` : An array of agencies or components that have been selected in the report form.
 * `isDisabled`: A boolean indicating that the field is disabled.

Example Use:
```
import ReportAgencyComponentTypeahead from './report_agency_component_typeahead';
...
<ReportAgencyComponentTypeahead
  agencies={agencies}
  agencyComponents={agencyComponents}
  agencyFinderDataProgress={agencyFinderDataProgress}
  agencyFinderDataComplete={agencyFinderDataComplete}
  selectedAgency={selectedAgency}
/>
```

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
/>
```


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
 
Example use:
```
<FoiaReportResultsTable
  key={`report-${table.id}`}
  ref={(ref) => { this.reportRefs[table.id] = ref; }}
  tableHeader={table.header}
  tableData={table.data}
  tableColumns={table.columns}
  displayMode={submissionAction}
/>
```
