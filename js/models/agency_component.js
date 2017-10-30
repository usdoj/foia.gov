import { List, Map, Record } from 'immutable';

const defaults = {
  abbreviation: null,
  agency: null, // An Agency model
  request_data_complex_average_days: null,
  request_data_complex_highest_days: null,
  request_data_complex_lowest_days: null,
  request_data_complex_median_days: null,
  description: new Map(),
  email: null,
  request_data_expedited_average_days: null,
  request_data_expedited_highest_days: null,
  request_data_expedited_lowest_days: null,
  request_data_expedited_median_days: null,
  request_data_year: null,
  field_misc: new List(), // foia_personnel
  foia_officers: new List(), // foia_personnel
  formFields: new List(),
  id: null,
  links: new Map(),
  paper_receiver: null,
  portal_submission_format: 'email',
  public_liaisons: new List(), // foia_personnel
  reading_rooms: new List(),
  request_form: null,
  service_centers: new List(), // foia_personnel
  request_data_simple_average_days: null,
  request_data_simple_highest_days: null,
  request_data_simple_lowest_days: null,
  request_data_simple_median_days: null,
  submission_address: new Map(),
  submission_api: null,
  submission_email: null,
  submission_fax: null,
  submission_web: null,
  telephone: null,
  title: null,
  type: 'agency_component',
  website: new Map(),
};


class AgencyComponent extends Record(defaults) {
  static parseWebformElements(webform) {
    const { elements } = webform;
    return Object.keys(elements || {})
      .map((name) => {
        const element = elements[name];

        // Map the keys from #type -> type
        return Object.keys(element).reduce(
          (webformField, key) => Object.assign(webformField, { [key.replace(/^#/, '')]: element[key] }),
          { name },
        );
      });
  }

  // Returns a list of all FOIA personnel
  foiaPersonnel() {
    function personnel(persons, title) {
      // Set a default title if none exists
      return (persons || []).map(person => Object.assign({ title: person.title || title }, person));
    }

    // List of all FOIA personnel in preferred order
    return [].concat(
      personnel(this.foia_officers, 'FOIA Officer'),
      personnel(this.field_misc, null),
      personnel(this.service_centers, 'FOIA Service Center'),
      personnel(this.public_liaisons, 'Public Liaison'),
    );
  }

  static agencyMission(agencyComponent) {
    if (agencyComponent.description) {
      return agencyComponent.description.value;
    }

    if (agencyComponent.agency.description) {
      return agencyComponent.agency.description.value;
    }

    return '';
  }
}

export default AgencyComponent;
