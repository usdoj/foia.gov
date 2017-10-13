import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import JsonApiParams from '../../util/json_api_params';

chai.use(sinonChai);


describe('JsonApiParams', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('defaults', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      query = params.serialize();
    });

    it('has _format parameter', () => {
      expect(query).to.equal('_format=api_json');
    });
  });

  describe('::include', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params.include('agency');
      query = params.serialize();
    });

    it('has include parameter', () => {
      expect(query).to.equal('_format=api_json&include=agency');
    });

    describe('given multiple includes', () => {
      beforeEach(() => {
        params.include('person');
        query = params.serialize();
      });

      it('appends additional includes', () => {
        expect(params._params).to.have.deep.property('include', ['agency', 'person']);
      });

      it('has comma separated list of includes', () => {
        expect(query).to.equal('_format=api_json&include=agency,person');
      });
    });
  });

  describe('::fields', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params.fields('agency', ['id', 'name']);
      query = params.serialize();
    });

    it('sets fields.agency as an object', () => {
      expect(params._params.fields).to.deep.equal({ agency: ['id', 'name'] });
    });

    it('includes a fields parameter', () => {
      expect(query).to.equal('_format=api_json&fields[agency]=id,name');
    });
  });

  describe('pagination', () => {
    describe('::offset', () => {
      let params;
      let query;

      beforeEach(() => {
        params = new JsonApiParams();
        params.offset(10);
        query = params.serialize();
      });

      it('sets a page object', () => {
        expect(params._params).to.have.property('page');
      });

      it('sets an offset parameter', () => {
        expect(query).to.equal('_format=api_json&page[offset]=10');
      });
    });

    describe('::limit', () => {
      let params;
      let query;

      beforeEach(() => {
        params = new JsonApiParams();
        params.limit(10);
        query = params.serialize();
      });

      it('sets a page object', () => {
        expect(params._params).to.have.property('page');
      });

      it('sets a limit parameter', () => {
        expect(query).to.equal('_format=api_json&page[limit]=10');
      });
    });

    describe('given offset and limit', () => {
      let params;
      let query;

      beforeEach(() => {
        params = new JsonApiParams();
        params.offset(20).limit(10);
        query = params.serialize();
      });

      it('sets a page object', () => {
        expect(params._params).to.have.deep.property('page', { limit: 10, offset: 20 });
      });

      it('sets both parameters', () => {
        expect(query).to.equal('_format=api_json&page[offset]=20&page[limit]=10');
      });
    });
  });

  describe('::filter', () => {
    describe('shorthand', () => {
      let params;
      let query;

      beforeEach(() => {
        params = new JsonApiParams();
        params.filter('id', 'gsa');
        query = params.serialize();
      });

      it('sets filter.id.value', () => {
        expect(params._params.filter).to.deep.equal({ id: { value: 'gsa' } });
      });

      it('includes a filter shorthand parameter', () => {
        expect(query).to.equal('_format=api_json&filter[id][value]=gsa');
      });
    });

    describe('longform', () => {
      let params;
      let query;

      beforeEach(() => {
        params = new JsonApiParams();
        params.filter('id-filter', 'id', 'gsa');
        query = params.serialize();
      });

      it('sets filter with a name', () => {
        expect(params._params.filter).to.deep.equal(
          {
            'id-filter': {
              condition: {
                path: 'id',
                value: 'gsa',
              },
            },
          },
        );
      });

      it('includes a filter longhand parameter', () => {
        expect(query).to.equal('_format=api_json&filter[id-filter][condition][path]=id&filter[id-filter][condition][value]=gsa');
      });
    });
  });

  describe('::or', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params
        .filter('id-filter', 'id', 'gsa')
        .filter('title-filter', 'title', 'general')
        .or('id-filter', 'title-filter');
      query = params.serialize();
    });

    it('incremends the internal groupId', () => {
      expect(params).to.have.property('_groupId', 1);
    });

    it('sets filter group object', () => {
      expect(params._params.filter).to.have.deep.property(
        'or-filter-1',
        { group: { conjunction: 'OR' } },
      );
    });

    it('adds the memberOf property to existing filters', () => {
      expect(params._params.filter).to.have.deep.property(
        'id-filter',
        { condition: { path: 'id', value: 'gsa', memberOf: 'or-filter-1' } },
      );
      expect(params._params.filter).to.have.deep.property(
        'title-filter',
        { condition: { path: 'title', value: 'general', memberOf: 'or-filter-1' } },
      );
    });

    it('includes a filter group conjunction parameters', () => {
      expect(query).to.match(/filter\[or-filter-1\]\[group\]\[conjunction\]=OR/);
    });

    it('includes filter memberOf parameters', () => {
      expect(query).to.match(/filter\[id-filter\]\[condition\]\[memberOf\]=or-filter-1/);
      expect(query).to.match(/filter\[title-filter\]\[condition\]\[memberOf\]=or-filter-1/);
    });
  });

  describe('::and', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params
        .filter('id-filter', 'id', 'gsa')
        .filter('title-filter', 'title', 'general')
        .and('id-filter', 'title-filter');
      query = params.serialize();
    });

    it('incremends the internal groupId', () => {
      expect(params).to.have.property('_groupId', 1);
    });

    it('sets filter group object', () => {
      expect(params._params.filter).to.have.deep.property(
        'and-filter-1',
        { group: { conjunction: 'AND' } },
      );
    });

    it('adds the memberOf property to existing filters', () => {
      expect(params._params.filter).to.have.deep.property(
        'id-filter',
        { condition: { path: 'id', value: 'gsa', memberOf: 'and-filter-1' } },
      );
      expect(params._params.filter).to.have.deep.property(
        'title-filter',
        { condition: { path: 'title', value: 'general', memberOf: 'and-filter-1' } },
      );
    });

    it('includes a filter group conjunction parameters', () => {
      expect(query).to.match(/filter\[and-filter-1\]\[group\]\[conjunction\]=AND/);
    });

    it('includes filter memberOf parameters', () => {
      expect(query).to.match(/filter\[id-filter\]\[condition\]\[memberOf\]=and-filter-1/);
      expect(query).to.match(/filter\[title-filter\]\[condition\]\[memberOf\]=and-filter-1/);
    });
  });

  describe('::contains', () => {
    let params;
    let query;

    beforeEach(() => {
      params = new JsonApiParams();
      params.contains('title', 'general');
      query = params.serialize();
    });

    it('sets a longform filter object with an operator', () => {
      expect(params._params.filter).to.have.deep.property(
        'title-filter',
        {
          condition: {
            path: 'title',
            value: 'general',
            operator: 'CONTAINS',
          },
        },
      );
    });

    it('includes a filter operator parameter', () => {
      expect(query).to.equal('_format=api_json&filter[title-filter][condition][path]=title&filter[title-filter][condition][value]=general&filter[title-filter][condition][operator]=CONTAINS');
    });
  });
});
