import { Map, Record } from 'immutable';

const defaults = {
  errors: new Map(),
  errorMessage: null,
  submission_id: null,
};


class SubmissionResult extends Record(defaults) {
}

export default SubmissionResult;
