import { Record } from 'immutable';

const defaults = {
  abbreviation: null,
  // component_count is not from the API, we track the number of components to
  // determine is_centralized
  component_count: 0,
  description: {},
  id: null,
  links: {},
  name: null,
  type: 'agency',
  category: null,
};

class Agency extends Record(defaults) {
  mission() {
    return this.description && this.description.value;
  }

  // This is complicated to calculate on the client. The API should provide an
  // is_centralized property https://github.com/18F/beta.foia.gov/issues/242
  //
  // This function is only valid _after_ the AGENCY_FINDER_DATA_COMPLETE action
  // fires. If you use it before then, it is not accurate. This is because we
  // can't determine if an agency is centralized until we fetch _all_ agency
  // components so that we can count them.
  isCentralized() {
    return this.component_count === 1;
  }
}

export default Agency;
