import { expect } from 'chai';

import { AgencyComponent } from '../../models';

describe('AgencyComponent', () => {
  describe('.parseWebformElements', () => {
    let webform;
    let result;

    beforeEach(() => {
      webform = {
        elements: {
          city: {
            '#title': 'City',
            '#type': 'textfield',
          },
          delivery_method: {
            '#options': {
              electronic: 'Electronic',
              paper: 'Paper',
            },
            '#title': 'Delivery Method',
            '#type': 'select',
          },
        },
      };

      result = AgencyComponent.parseWebformElements(webform);
    });

    it('returns an array', () => {
      expect(result).to.be.an.instanceOf(Array);
    });

    it('has city form field', () => {
      const formField = result[0];
      expect(formField).to.deep.equal({
        name: 'city',
        title: 'City',
        type: 'textfield',
      });
    });

    it('has city form field', () => {
      const formField = result[1];
      expect(formField).to.deep.equal({
        name: 'delivery_method',
        title: 'Delivery Method',
        type: 'select',
        options: {
          electronic: 'Electronic',
          paper: 'Paper',
        },
      });
    });
  });
});
