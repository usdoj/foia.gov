import { Record } from 'immutable';

const defaults = {
  abbreviation: null,
  agency: null, // An Agency
  id: null,
  title: null,
  type: 'agency_component',
};

class AgencyComponent extends Record(defaults) {
}

export default AgencyComponent;
