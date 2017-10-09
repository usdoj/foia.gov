import { Map, Record } from 'immutable';

const defaults = {
  errors: new Map(),
  errorMessage: null,
  submissionId: null,
};


class SubmissionResult extends Record(defaults) {
}

export default SubmissionResult;
