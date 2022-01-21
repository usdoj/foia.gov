import 'test/setup';

import React from 'react';
import { shallow } from 'enzyme';

import FoiaSubmissionAddress from 'components/foia_submission_address';

describe('FoiaSubmissionAddress', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('given an undefined submissionAddress', () => {
    let element;

    beforeEach(() => {
      element = shallow(<FoiaSubmissionAddress submissionAddress={undefined} />);
    });

    it('renders okay', () => {
      expect(() => element.render()).not.to.throw();
    });
  });
});
