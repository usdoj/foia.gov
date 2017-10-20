import { List, Map, Record } from 'immutable';

const defaults = {
  abbreviation: null,
  agency: null, // An Agency model
  complex_average_days: null,
  complex_highest_days: null,
  complex_lowest_days: null,
  complex_median_days: null,
  description: new Map(),
  email: null,
  expedited_average_days: null,
  expedited_highest_days: null,
  expedited_lowest_days: null,
  expedited_median_days: null,
  field_request_data_year: null,
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
  // TODO request_time_stats does not exist in the API, but exists in the 2015 scraper data
  request_time_stats: null,
  service_centers: new List(), // foia_personnel
  simple_average_days: null,
  simple_highest_days: null,
  simple_lowest_days: null,
  simple_median_days: null,
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
      return (persons || []).map(person => person.update('title', value => value || title));
    }

    // List of all FOIA personnel in preferred order
    return (new List()).concat(
      personnel(this.foia_officers, 'FOIA Officer'),
      personnel(this.field_misc, null),
      personnel(this.service_centers, 'FOIA Service Center'),
      personnel(this.public_liaisons, 'Public Liaison'),
    );
  }
}

export default AgencyComponent;
