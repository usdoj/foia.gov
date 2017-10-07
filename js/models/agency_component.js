import { List, Map, Record } from 'immutable';

const defaults = {
  abbreviation: null,
  agency: null, // An Agency model
  description: new Map(),
  email: null,
  field_misc: new List(), // foia_personnel
  foia_officers: new List(), // foia_personnel
  id: null,
  links: new Map(),
  paper_receiver: null,
  portal_submission_format: 'email',
  public_liaisons: new List(), // foia_personnel
  reading_rooms: new List(),
  request_form: null,
  service_centers: new List(), // foia_personnel
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
