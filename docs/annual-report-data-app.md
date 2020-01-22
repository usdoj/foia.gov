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
