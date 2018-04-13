import React, { Component } from 'react';
import { Container } from 'flux/utils';
import agencyComponentStore from '../stores/agency_component';
import { requestActions } from 'actions';
import ExcellentExport from 'excellentexport';

/**
 * A download page for getting all agency component contact information as CSV.
 */
class AgencyComponentDownloadPage extends Component {
  static getStores() {
    return [agencyComponentStore];
  }

  static calculateState() {
    const { agencyComponents } = agencyComponentStore.getState();
    return {
      agencyComponents,
    };
  }

  getFoiaPersonnelFields() {
    return ['foia_officers', 'public_liaisons', 'service_centers'];
  }

  componentDidMount() {
    // If there is any agency data, assume all the data is fetched.
    if (this.state.agencyComponents.size) {
      return;
    }

    // Pre-fetch the list of agency components, re-purposing the "finder" code.
    let includeReferenceFields = {
      agency_component: ['title', 'agency', 'submission_address', 'submission_fax', 'website'],
      agency: ['name'],
    };
    this.getFoiaPersonnelFields().forEach(personnelField => {
      includeReferenceFields.agency_component.push(personnelField);
      includeReferenceFields[personnelField] = ['name', 'title', 'email', 'phone'];
    });
    requestActions.fetchAgencyFinderData(includeReferenceFields);
  }

  handleClick() {
    if (this.rows) {
      return ExcellentExport.convert({
        anchor: this.myButton,
        filename: 'FOIA-Agency-Contacts',
        format: 'csv'
      }, [{
        name: 'FOIA Agency Contacts',
        from: {
          array: this.rows
        }
      }]);
    }
  }

  render() {

    const progress = agencyComponentStore.getState().agencyFinderDataProgress;

    if (progress < 100) {
      if (this.myButton) {
        this.myButton.innerHTML = 'Please wait - ' + progress + '%';
      }
    }
    else {

      const {
        agencyComponents
      } = this.state;

      // Construct a large array of all the FOIA personnel as rows (objects).
      let header = [
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
      let rows = [];
      agencyComponents.forEach(agencyComponent => {
        this.getFoiaPersonnelFields().forEach(personnelField => {
          agencyComponent[personnelField].forEach(foiaPersonnel => {
            let phone = '';
            if (foiaPersonnel.phone) {
              phone = foiaPersonnel.phone.join(', ');
            }
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
              phone,
              agencyComponent.submission_fax,
            ]);
          });
        });
      });

      // Sort the array of rows by the agency name, then component, then contact.
      let orderPositions = [
        header.indexOf('Department'),
        header.indexOf('Component'),
        header.indexOf('Name'),
      ];
      rows.sort(function(a, b) {
        for (var i in orderPositions) {
          let pos = orderPositions[i];
          let aLower = (a[pos]) ? a[pos].toLowerCase() : '';
          let bLower = (b[pos]) ? b[pos].toLowerCase() : '';
          if (aLower < bLower) {
            return -1;
          }
          if (aLower > bLower) {
            return 1;
          }
        }
        return 0;
      });

      this.myButton.innerHTML = 'Download to CSV';
      this.rows = rows;

    }

    return <a
      className="usa-button"
      ref={c => this.myButton = c}
      onClick={this.handleClick.bind(this)}
    >Please wait</a>;
  }
}

export default Container.create(AgencyComponentDownloadPage);
