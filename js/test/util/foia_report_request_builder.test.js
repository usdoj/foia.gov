import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { OrderedMap } from 'immutable';

import annualReportDataTypesStore, { AnnualReportDataTypesStore } from '../../stores/annual_report_data_types';
import annualReportDataFormStore, { AnnualReportDataFormStore } from '../../stores/annual_report_data_form';
import { FoiaAnnualReportRequestBuilder } from '../../util/foia_annual_report_request_builder';
import JsonApiParams from '../../util/json_api_params';

chai.use(sinonChai);

describe('FoiaAnnualReportRequestBuilder', () => {
  let requestBuilder;
  let sandbox;
  const buildDataTypeStubs = () => {
    const dataTypes = new OrderedMap({
      group_v_a_foia_requests_received: {
        id: 'group_v_a_foia_requests_received',
        label: 'Requests',
        fields: [
          {
            id: 'field_foia_requests_va.field_req_pend_start_yr',
            label: 'Number of Requests Pending as of Start of Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_pend_start_yr',
          }, {
            id: 'field_foia_requests_va.field_req_received_yr',
            label: 'Number of Requests Received in Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_received_yr',
          }, {
            id: 'field_foia_requests_va.field_req_processed_yr',
            label: 'Number of Requests Processed in Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_processed_yr',
          }, {
            id: 'field_foia_requests_va.field_req_pend_end_yr',
            label: 'Number of Requests Pending as of End of Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_pend_end_yr',
          },
          {
            id: 'field_footnotes_va',
            label: 'Footnotes',
            filter: false,
            overall_field: false,
          },
        ],
        includes: ['field_foia_requests_va', 'field_foia_requests_va.field_agency_component'],
      },
      group_iv_exemption_3_statutes: {
        id: 'group_iv_exemption_3_statutes',
        label: ' - Exemption 3 Statutes',
        fields: [
          {
            id: 'field_statute_iv.field_statute',
            label: 'Statute',
            filter: false,
            overall_field: false,
          },
          {
            id: 'field_statute_iv.field_type_of_info_withheld',
            label: 'Type of Information Withheld',
            filter: false,
            overall_field: false,
          }, {
            id: 'field_statute_iv.field_agency_component_inf.field_num_relied_by_agency_comp',
            label: 'Number of Times Relied Upon',
            filter: true,
            overall_field: 'field_statute_iv.field_total_num_relied_by_agency',
          },
          {
            id: 'field_footnotes_iv',
            label: 'Footnotes',
            filter: false,
            overall_field: false,
          },
        ],
        includes: ['field_statute_iv', 'field_statute_iv.field_agency_component_inf'],
      },
    });
    sandbox.stub(AnnualReportDataTypesStore.prototype, 'getState').returns({ dataTypes });
    sandbox.stub(annualReportDataTypesStore, 'state').value({ dataTypes });

    const selectedDataTypes = [
      {
        id: 'group_v_a_foia_requests_received',
        index: 0,
        fields: [
          {
            id: 'field_foia_requests_va.field_req_pend_start_yr',
            label: 'Number of Requests Pending as of Start of Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_pend_start_yr',
          }, {
            id: 'field_foia_requests_va.field_req_received_yr',
            label: 'Number of Requests Received in Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_received_yr',
          }, {
            id: 'field_foia_requests_va.field_req_processed_yr',
            label: 'Number of Requests Processed in Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_processed_yr',
          }, {
            id: 'field_foia_requests_va.field_req_pend_end_yr',
            label: 'Number of Requests Pending as of End of Fiscal Year',
            filter: true,
            overall_field: 'field_overall_req_pend_end_yr',
          },
          {
            id: 'field_footnotes_va',
            label: 'Footnotes',
            filter: false,
            overall_field: false,
          },
        ],
        filterOptions: [
          {
            value: 'field_foia_requests_va.field_req_pend_start_yr',
            label: 'Number of Requests Pending as of Start of Fiscal Year',
          }, {
            value: 'field_foia_requests_va.field_req_received_yr',
            label: 'Number of Requests Received in Fiscal Year',
          }, {
            value: 'field_foia_requests_va.field_req_processed_yr',
            label: 'Number of Requests Processed in Fiscal Year',
          }, {
            value: 'field_foia_requests_va.field_req_pend_end_yr',
            label: 'Number of Requests Pending as of End of Fiscal Year',
          },
        ],
        filter: {
          applied: false,
          filterField: 'field_foia_requests_va.field_req_pend_start_yr',
          op: 'greater_than',
          compareValue: '',
        },
      },
      {
        id: 'group_iv_exemption_3_statutes',
        index: 1,
        fields: [
          {
            id: 'field_statute_iv.field_statute',
            label: 'Statute',
            filter: false,
            overall_field: false,
          }, {
            id: 'field_statute_iv.field_type_of_info_withheld',
            label: 'Type of Information Withheld',
            filter: false,
            overall_field: false,
          }, {
            id: 'field_statute_iv.field_agency_component_inf.field_num_relied_by_agency_comp',
            label: 'Number of Times Relied Upon',
            filter: true,
            overall_field: 'field_statute_iv.field_total_num_relied_by_agency',
          }, {
            id: 'field_footnotes_iv', label: 'Footnotes', filter: false, overall_field: false,
          }],
        filterOptions: [
          {
            value: 'field_statute_iv.field_agency_component_inf.field_num_relied_by_agency_comp',
            label: 'Number of Times Relied Upon',
          },
        ],
        filter: {
          applied: false,
          filterField: 'field_statute_iv.field_agency_component_inf.field_num_relied_by_agency_comp',
          op: 'greater_than',
          compareValue: '',
        },
      },
    ];
    sandbox.stub(AnnualReportDataFormStore.prototype, 'getState').returns({ selectedDataTypes });
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    buildDataTypeStubs();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    requestBuilder = new FoiaAnnualReportRequestBuilder('http://jsonapi.example.com');
  });

  it('contains a JsonApiParams request property', () => {
    expect(requestBuilder).to.have.property('request');
    expect(requestBuilder.request).to.be.an.instanceOf(JsonApiParams);
  });

  it('has default includes and fields', () => {
    expect(requestBuilder.request._params).to.have.property('fields');
    expect(requestBuilder.request._params).to.have.property('include');
    expect(requestBuilder.request._params.include.sort()).to.deep
      .equal(['field_agency', 'field_agency_components'].sort());
    expect(requestBuilder.request._params.fields).to.deep
      .equal({
        annual_foia_report_data: ['title', 'field_foia_annual_report_yr', 'field_agency', 'field_agency_components'],
        field_agency: ['name', 'abbreviation'],
        field_agency_components: ['title'],
      });
  });

  describe('::addOrganizationsGroup', () => {
    it('adds agency and component filters when given an array of abbreviations', () => {
      requestBuilder.addOrganizationsGroup({
        agencies: ['DOJ', 'NASA'],
        components: ['OIG', 'FMC'],
      });

      expect(requestBuilder.request._params).to.have.property('filter');
      expect(requestBuilder.request._params.filter).to.deep.equal({
        'agency-DOJ': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency.abbreviation',
            value: 'DOJ',
          },
        },
        'agency-NASA': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency.abbreviation',
            value: 'NASA',
          },
        },
        'component-OIG': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency_components.abbreviation',
            value: 'OIG',
          },
        },
        'component-FMC': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency_components.abbreviation',
            value: 'FMC',
          },
        },
        'or-filter-1': {
          group: {
            conjunction: 'OR',
          },
        },
      });
    });

    it('adds multiple OR conditions if called twice', () => {
      requestBuilder
        .addOrganizationsGroup({
          agencies: ['NASA'],
          components: ['FMC'],
        })
        .addOrganizationsGroup({
          agencies: ['DOJ'],
          components: ['OIG'],
        });

      expect(requestBuilder.request._params).to.have.property('filter');
      expect(requestBuilder.request._params.filter).to.deep.equal({
        'agency-DOJ': {
          condition: {
            memberOf: 'or-filter-2',
            path: 'field_agency.abbreviation',
            value: 'DOJ',
          },
        },
        'agency-NASA': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency.abbreviation',
            value: 'NASA',
          },
        },
        'component-OIG': {
          condition: {
            memberOf: 'or-filter-2',
            path: 'field_agency_components.abbreviation',
            value: 'OIG',
          },
        },
        'component-FMC': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_agency_components.abbreviation',
            value: 'FMC',
          },
        },
        'or-filter-1': {
          group: {
            conjunction: 'OR',
          },
        },
        'or-filter-2': {
          group: {
            conjunction: 'OR',
          },
        },
      });
    });
  });

  describe('::addFiscalYearsGroup', () => {
    it('adds fiscal years filter group when given an array of years', () => {
      requestBuilder.addFiscalYearsGroup(['2019', '2018']);

      expect(requestBuilder.request._params).to.have.property('filter');
      expect(requestBuilder.request._params.filter).to.deep.equal({
        'fiscal-year-2019': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_foia_annual_report_yr',
            value: '2019',
          },
        },
        'fiscal-year-2018': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_foia_annual_report_yr',
            value: '2018',
          },
        },
        'or-filter-1': {
          group: {
            conjunction: 'OR',
          },
        },
      });
    });

    it('adds multiple OR condition groups if called twice', () => {
      requestBuilder
        .addFiscalYearsGroup(['2019'])
        .addFiscalYearsGroup(['2018']);

      expect(requestBuilder.request._params).to.have.property('filter');
      expect(requestBuilder.request._params.filter).to.deep.equal({
        'fiscal-year-2019': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_foia_annual_report_yr',
            value: '2019',
          },
        },
        'fiscal-year-2018': {
          condition: {
            memberOf: 'or-filter-2',
            path: 'field_foia_annual_report_yr',
            value: '2018',
          },
        },
        'or-filter-1': {
          group: {
            conjunction: 'OR',
          },
        },
        'or-filter-2': {
          group: {
            conjunction: 'OR',
          },
        },
      });
    });
  });

  describe('::addDataTypeFiltersGroup', () => {
    it('adds data type filters when given an array of filter objects', () => {
      requestBuilder.addDataTypeFiltersGroup([
        {
          filterField: 'field_admin_app_via.field_app_pend_start_yr',
          op: 'greater_than',
          compareValue: '4',
        },
        {
          filterField: 'field_foia_requests_vb1.field_full_grants',
          op: 'equal_to',
          compareValue: '6',
        },
        {
          filterField: 'field_proc_req_viia.field_comp_high',
          op: 'is_na',
        },
        {
          filterField: 'field_req_viiia.field_num_jud_w10',
          op: 'less_than',
          compareValue: '20',
        },
      ]);

      expect(requestBuilder.request._params).to.have.property('filter');
      expect(requestBuilder.request._params.filter).to.deep.equal({
        'data-type-filter-0': {
          condition: {
            memberOf: 'or-filter-1',
            operator: '>',
            path: 'field_admin_app_via.field_app_pend_start_yr',
            value: '4',
          },
        },
        'data-type-filter-1': {
          condition: {
            memberOf: 'or-filter-1',
            operator: '=',
            path: 'field_foia_requests_vb1.field_full_grants',
            value: '6',
          },
        },
        'data-type-filter-2': {
          condition: {
            memberOf: 'or-filter-1',
            operator: '=',
            path: 'field_proc_req_viia.field_comp_high',
            value: 'N/A',
          },
        },
        'data-type-filter-3': {
          condition: {
            memberOf: 'or-filter-1',
            operator: '<',
            path: 'field_req_viiia.field_num_jud_w10',
            value: '20',
          },
        },
        'data-type-filter-lt1-3': {
          condition: {
            memberOf: 'or-filter-1',
            path: 'field_req_viiia.field_num_jud_w10',
            value: '<1',
          },
        },
        'or-filter-1': {
          group: {
            conjunction: 'OR',
          },
        },
      });
    });
  });

  describe('::includeDataTypes', () => {
    it('builds includes and fields based on sections defined in the annualReportDataTypesStore', () => {
      const { selectedDataTypes } = annualReportDataFormStore.getState();
      requestBuilder.includeDataTypes(selectedDataTypes, false);

      expect(requestBuilder.request._params, '_params').to.have.property('include');
      expect(requestBuilder.request._params.include.sort(), 'requestBuilder.request._params.include')
        .to
        .eql([
          'field_agency',
          'field_agency_components',
          'field_statute_iv',
          'field_foia_requests_va.field_agency_component',
          'field_statute_iv.field_agency_component_inf',
          'field_foia_requests_va',
        ].sort());

      expect(requestBuilder.request._params, '_params').to.have.property('fields');
      expect(
        Object.keys(requestBuilder.request._params.fields).sort(),
        'requestBuilder.request._params.fields keys',
      ).to.eql([
        'annual_foia_report_data',
        'field_agency',
        'field_agency_components',
        'field_foia_requests_va',
        'field_statute_iv',
        'field_statute_iv.field_agency_component_inf',
      ].sort());

      expect(
        requestBuilder.request._params.fields.annual_foia_report_data.sort(),
        'requestBuilder.request._params.fields.annual_foia_report_data',
      ).to.eql([
        'title',
        'field_foia_annual_report_yr',
        'field_agency',
        'field_agency_components',
        'field_foia_requests_va',
        'field_statute_iv',
        'field_footnotes_va',
        'field_footnotes_iv',
      ].sort());
      expect(
        requestBuilder.request._params.fields.field_agency.sort(),
        'requestBuilder.request._params.fields.field_agency',
      ).to.eql(
        ['name', 'abbreviation'].sort(),
      );
      expect(
        requestBuilder.request._params.fields.field_agency_components.sort(),
        'requestBuilder.request._params.fields.field_agency_components',
      ).to.eql(['title']);
      expect(
        requestBuilder.request._params.fields.field_foia_requests_va.sort(),
        'requestBuilder.request._params.fields.field_foia_requests_va',
      ).to.eql([
        'field_agency_component',
        'field_req_pend_start_yr',
        'field_req_received_yr',
        'field_req_processed_yr',
        'field_req_pend_end_yr',
      ].sort());
      expect(
        requestBuilder.request._params.fields.field_statute_iv.sort(),
        'requestBuilder.request._params.fields.field_statute_iv',
      ).to.eql([
        'field_agency_component_inf',
        'field_statute',
        'field_type_of_info_withheld',
      ].sort());
    });
  });

  describe('::getSectionFields', () => {
    it('builds an object of entities and fields based on given sections', () => {
      const { dataTypes } = annualReportDataTypesStore.getState();
      const fields = FoiaAnnualReportRequestBuilder.getSectionFields(
        dataTypes.filter((value, key) => key === 'group_v_a_foia_requests_received'),
        false,
      );

      expect(Object.keys(fields).sort(), 'fields keys').to.eql(['annual_foia_report_data', 'field_foia_requests_va']);
      expect(fields.annual_foia_report_data.sort(), 'group_v_a_foia_requests_received annual_foia_report_data fields').to.eql(
        ['field_foia_requests_va', 'field_footnotes_va'].sort(),
      );
      expect(fields.field_foia_requests_va.sort(), 'group_v_a_foia_requests_received field_foia_requests_va fields')
        .to.eql([
          'field_agency_component',
          'field_req_pend_start_yr',
          'field_req_received_yr',
          'field_req_processed_yr',
          'field_req_pend_end_yr',
        ].sort());
    });
  });

  describe('::getIncludeFields', () => {
    it('builds an array of fields to be included based on given sections', () => {
      const { dataTypes } = annualReportDataTypesStore.getState();
      const includes = FoiaAnnualReportRequestBuilder.getSectionIncludes(
        dataTypes.filter((value, key) => key === 'group_v_a_foia_requests_received'),
        false,
      );

      expect(includes.sort(), 'includes').to.eql(['field_foia_requests_va', 'field_foia_requests_va.field_agency_component'].sort());
    });
  });
});
