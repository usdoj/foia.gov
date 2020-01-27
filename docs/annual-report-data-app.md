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


### Models


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
