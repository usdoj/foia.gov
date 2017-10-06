import { Record } from 'immutable';

const defaults = {
  abbreviation: null,
  id: null,
  name: null,
  type: 'agency',
};

class Agency extends Record(defaults) {
}

export default Agency;
