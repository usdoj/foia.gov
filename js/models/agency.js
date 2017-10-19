import { Record } from 'immutable';

const defaults = {
  abbreviation: null,
  description: {},
  id: null,
  links: {},
  name: null,
  type: 'agency',
};

class Agency extends Record(defaults) {
}

export default Agency;
