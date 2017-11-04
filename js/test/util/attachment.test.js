import { expect } from 'chai';

import { dataUrlToAttachment } from '../../util/attachment';


describe('util/attachment', () => {
  describe('dataUrlToAttachment()', () => {
    it('returns null for empty string', () => {
      expect(dataUrlToAttachment('')).to.equal(null);
    });

    it('returns null for null', () => {
      expect(dataUrlToAttachment(null)).to.equal(null);
    });

    it('parses urls with no attributes', () => {
      expect(dataUrlToAttachment('data:text/plain,hello%20world')).to.deep.equal({
        content_type: 'text/plain',
        filedata: 'hello%20world',
      });
    });

    it('parses attributes', () => {
      expect(dataUrlToAttachment('data:text/plain;filename=foo.txt;size=233;base64,AAAA')).to.deep.equal({
        filename: 'foo.txt',
        size: 233,
        content_type: 'text/plain',
        filedata: 'AAAA',
      });
    });

    it('url decodes filename attribute', () => {
      expect(dataUrlToAttachment('data:text/plain;filename=foo%20bar.txt;size=233;base64,AAAA')).to.deep.equal({
        filename: 'foo bar.txt',
        size: 233,
        content_type: 'text/plain',
        filedata: 'AAAA',
      });
    });
  });

  describe('fileFieldsToAttachment()', () => {
  });
});
