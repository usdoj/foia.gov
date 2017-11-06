import { expect } from 'chai';

import { dataUrlToAttachment } from '../../util/attachment';


describe('util/attachment', () => {
  describe('dataUrlToAttachment()', () => {
    it('given empty string, returns an empty array', () => {
      expect(dataUrlToAttachment('')).to.deep.equal([]);
    });

    it('given empty string, returns an empty array', () => {
      expect(dataUrlToAttachment(null)).to.deep.equal([]);
    });

    it('parses urls with no attributes', () => {
      expect(dataUrlToAttachment('data:text/plain,hello%20world')).to.deep.equal([{
        content_type: 'text/plain',
        filedata: 'hello%20world',
      }]);
    });

    it('parses attributes', () => {
      expect(dataUrlToAttachment('data:text/plain;filename=foo.txt;filesize=233;base64,AAAA')).to.deep.equal([{
        filename: 'foo.txt',
        filesize: 233,
        content_type: 'text/plain',
        filedata: 'AAAA',
      }]);
    });

    it('url decodes filename attribute', () => {
      expect(dataUrlToAttachment('data:text/plain;filename=foo%20bar.txt;filesize=233;base64,AAAA')).to.deep.equal([{
        filename: 'foo bar.txt',
        filesize: 233,
        content_type: 'text/plain',
        filedata: 'AAAA',
      }]);
    });
  });
});
