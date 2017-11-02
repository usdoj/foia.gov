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
  mission() {
    return this.description && this.description.value;
  }
}

export default Agency;
