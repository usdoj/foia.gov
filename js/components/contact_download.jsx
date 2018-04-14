import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { requestActions } from 'actions';
import ExcellentExport from 'excellentexport';
import agencyComponentStore from '../stores/agency_component';

/**
 * A download button for getting all agency component contact information as CSV.
 */
class ContactDownloadButton extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agencyComponents } = agencyComponentStore.getState();
    return {
      agencyComponents,
    };
  }

  /**
   * Get the agency_component fields that contain contact information.
   */
  static getFoiaPersonnelFields() {
    return ['foia_officers', 'public_liaisons', 'service_centers'];
  }

  componentDidMount() {
    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencyComponents.size) {
      return;
    }

    // Pre-fetch the list of agency components, re-purposing the "finder" code.
    const includeReferenceFields = {
      agency_component: ['title', 'agency', 'submission_address', 'submission_fax', 'website'],
      agency: ['name'],
    };
    ContactDownloadButton.getFoiaPersonnelFields().forEach((personnelField) => {
      includeReferenceFields.agency_component.push(personnelField);
      includeReferenceFields[personnelField] = ['name', 'title', 'email', 'phone'];
    });
    requestActions.fetchAgencyFinderData(includeReferenceFields);
  }

  /**
   * Download the CSV file.
   */
  performDownload() {
    return ExcellentExport.convert({
      anchor: this.downloadButton,
      filename: 'FOIA-Agency-Contacts',
      format: 'csv',
    }, [{
      name: 'FOIA Agency Contacts',
      from: {
        array: this.rows,
      },
    }]);
  }

  /**
   * Event handler for when the download button is triggered.
   */
  handleClick() {
    return (this.rows) ? this.performDownload() : false;
  }

  /**
   * Called each time a batch of agency components finished loading.
   */
  render() {
    const progress = agencyComponentStore.getState().agencyFinderDataProgress;

    // If this is not the last batch, just update the button text.
    if (progress < 100) {
      if (this.downloadButton) {
        this.downloadButton.innerHTML = `Please wait - ${progress}%`;
      }
    } else {
      // Otherwise, prepare the CSV data.
      const { agencyComponents } = this.state;

      // Construct a large array of all the FOIA personnel as rows (objects).
      const header = [
        'Component',
        'Department',
        'Name',
        'Title',
        'Email',
        'Street Address 1',
        'Street Address 2',
        'City',
        'State',
        'Zip code',
        'Telephone',
        'Fax',
      ];
      const rows = [];
      agencyComponents.forEach((agencyComponent) => {
        ContactDownloadButton.getFoiaPersonnelFields().forEach((personnelField) => {
          agencyComponent[personnelField].forEach((foiaPersonnel) => {
            rows.push([
              agencyComponent.title,
              agencyComponent.agency.name,
              foiaPersonnel.name,
              foiaPersonnel.title,
              foiaPersonnel.email,
              agencyComponent.submission_address.address_line1,
              agencyComponent.submission_address.address_line2,
              agencyComponent.submission_address.locality,
              agencyComponent.submission_address.administrative_area,
              agencyComponent.submission_address.postal_code,
              (foiaPersonnel.phone) ? foiaPersonnel.phone.join(', ') : '',
              agencyComponent.submission_fax,
            ]);
          });
        });
      });

      // Sort the array of rows by the agency name, then component, then person name.
      const orderPositions = [
        header.indexOf('Department'),
        header.indexOf('Component'),
        header.indexOf('Name'),
      ];
      rows.sort((a, b) => {
        let i;
        for (i = 0; i < orderPositions.length; i++) {
          const pos = orderPositions[i];
          const aLower = (a[pos]) ? a[pos].toLowerCase() : '';
          const bLower = (b[pos]) ? b[pos].toLowerCase() : '';
          if (aLower < bLower) {
            return -1;
          }
          if (aLower > bLower) {
            return 1;
          }
        }
        return 0;
      });
      rows.unshift(header);

      // Update the button text.
      this.downloadButton.innerHTML = 'Download to CSV';
      // Save the row data for whenever the user clicks the button.
      this.rows = rows;
    }

    // Return the anchor link itself.
    return (
      <a
        href="download"
        role="button"
        tabIndex={0}
        className="usa-button"
        ref={(c) => { this.downloadButton = c; }}
        onClick={this.handleClick.bind(this)}
      >Please wait</a>
    );
  }
}

export default Container.create(ContactDownloadButton);
