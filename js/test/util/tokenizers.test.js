import { expect } from 'chai';

import tokenizers from '../../util/tokenizers';

describe('tokenizers', () => {
  describe('firstLetterOfEachCapitalizedWord', () => {
    const { firstLetterOfEachCapitalizedWord } = tokenizers;

    it('returns the first letter of each word', () => {
      expect(firstLetterOfEachCapitalizedWord('General Services Administration')).to.deep.equal(['GSA']);
    });

    it('skips lowercase words', () => {
      expect(firstLetterOfEachCapitalizedWord('Executive Office for Immigration Review')).to.deep.equal(['EOIR']);
    });
  });
});
