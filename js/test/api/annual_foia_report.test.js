import 'test/setup';
import { JsonApi } from '../../util/json_api';

describe('FOIA Api', function foiaApiTestScenarios() {
  // Increasing (default 2000ms) to account for real-world conditions.
  this.timeout(30000);

  let apiResponse;
  let apiResponseData;

  const makeRequest = (endpoint, params = {}) => {
    const api = new JsonApi();

    return api.get(endpoint, { params }).then((response) => {
      apiResponse = response;
      apiResponseData = response.data.data;
      return response;
    });
  };

  describe('/annual_foia_report/fiscal_years', () => {
    before(() => makeRequest('/annual_foia_report/fiscal_years'));

    it('returns a 200 response code.', () => {
      expect(apiResponse.status).to.equal(200);
    });

    it('returns an array of multiple values.', () => {
      expect(apiResponse.data).to.be.an('array');
      expect(apiResponse.data.length).to.be.greaterThan(1);
    });

    it('returns numerical years.', () => {
      apiResponse.data.forEach((raw_value) => {
        const parsed = parseInt(raw_value, 10);
        expect(parsed).to.be.greaterThan(0);
        expect(parsed).to.be.lessThan(3000);
      });
    });
  });

  describe('/agency_components', () => {
    before(() => makeRequest('/agency_components'));

    it('returns a 200 response code.', () => {
      expect(apiResponse.status).to.equal(200);
    });

    it('returns multiple objects in the data array.', () => {
      expect(apiResponseData).to.be.an('array');
      expect(apiResponseData.length).to.be.greaterThan(1);
    });

    it('returns objects of type agency_component.', () => {
      apiResponseData.forEach((obj) => {
        expect(obj.type).to.equal('agency_component');
      });
    });
  });

  describe('/annual_foia_report request', () => {
    before(() => {
      const endpoint = '/annual_foia_report';
      const params = {
        filter: {
          agencyFilter: {
            condition: {
              path: 'field_agency.abbreviation',
              value: ['USAID'],
              operator: 'IN',
            },
          },
        },
      };
      return makeRequest(endpoint, params);
    });

    it('returns a 200 response code.', () => {
      expect(apiResponse.status).to.equal(200);
    });

    it('returns at least one object in the data array.', () => {
      expect(apiResponseData).to.be.an('array');
      expect(apiResponseData.length).to.be.at.least(1);
    });

    it('returns objects of type agency_component', () => {
      apiResponseData.forEach((obj) => {
        expect(obj.type).to.equal('annual_foia_report_data');
      });
    });

    it('returns only components belonging to the requested agency', () => {
      apiResponseData.forEach((obj) => {
        expect(obj.attributes.field_agency_abbr).to.equal('USAID');
      });
    });
  });
});
