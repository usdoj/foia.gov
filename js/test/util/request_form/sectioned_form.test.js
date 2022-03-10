import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiSinon from 'sinon-chai';

import wfjs from '../../../util/request_form/webform_to_json_schema';
import sectionedForm from '../../../util/request_form/sectioned_form';

chai.use(chaiSinon);

describe('SectionedFormBuilder', () => {
  let builder;
  let sandbox;
  let spy;

  beforeEach(() => {
    const formSections = [
      {
        id: 'contact_section',
        title: 'Contact',
        description: 'Contact information.',
        fieldNames: ['email'],
      },
      {
        id: 'additional_section',
        title: 'Additional',
        description: 'Additional information.',
        fieldNames: [],
        isAgencySpecificFieldSection: true,
      },
    ];

    builder = new sectionedForm.SectionedFormBuilder(formSections);
    sandbox = sinon.createSandbox();
    spy = sandbox.spy(wfjs, 'webformFieldsToJsonSchema');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('given an agencyComponent no fields', () => {
    let agencyComponent;
    let result;

    beforeEach(() => {
      agencyComponent = {
        title: 'Office of Information Policy',
        formFields: [],
      };

      result = builder.sectionedFormFromAgencyComponent(agencyComponent);
    });

    it('does not call webformFieldsToJsonSchema', () => {
      expect(spy).not.to.have.been.called;
    });

    it('returns result with jsonSchema', () => {
      expect(result).to.have.property('jsonSchema');
    });

    it('returns result with uiSchema', () => {
      expect(result).to.have.property('uiSchema');
    });

    describe('jsonSchema', () => {
      let jsonSchema;
      beforeEach(() => {
        jsonSchema = result.jsonSchema;
      });

      it('has a title "Make your request"', () => {
        expect(jsonSchema).to.have.property('title', 'Make your request');
      });

      it('has a type', () => {
        expect(jsonSchema).to.have.property('type', 'object');
      });

      it('has a properties object', () => {
        expect(jsonSchema).to.have.property('properties');
        expect(jsonSchema.properties).to.be.an('object');
      });
    });
  });

  describe('given an agencyComponent with formFields', () => {
    describe('given agency-component-specific fields', () => {
      // These are fields not matching any of the other fields. The section
      // selected is based on the isAgencySpecificFieldSection, currently hard-coded
      let agencyComponent;
      let result;

      beforeEach(() => {
        agencyComponent = {
          title: 'Office of Information Policy',
          formFields: [
            {
              name: 'agency_specific_field',
              title: 'An agency specific field',
            },
          ],
        };

        result = builder.sectionedFormFromAgencyComponent(agencyComponent);
      });

      it('calls webformFieldsToJsonSchema', () => {
        expect(spy).to.have.been.calledOnce;
      });

      describe('uiSchema', () => {
        let uiSchema;
        beforeEach(() => {
          uiSchema = result.uiSchema;
        });

        it('exists', () => {
          expect(uiSchema).to.be.ok;
        });

        it('has a single section with uiSchema', () => {
          expect(uiSchema).to.deep.equal({
            additional_section: {
              agency_specific_field: {
                'ui:title': 'An agency specific field',
                'ui:description': undefined,
              },
              'ui:order': [
                'agency_specific_field',
              ],
            },
          });
        });
      });

      describe('jsonSchema', () => {
        let jsonSchema;
        beforeEach(() => {
          jsonSchema = result.jsonSchema;
        });

        it('exists', () => {
          expect(jsonSchema).to.be.ok;
        });

        it('has a title "Make your request"', () => {
          expect(jsonSchema).to.have.property('title', 'Make your request');
        });

        it('has a type', () => {
          expect(jsonSchema).to.have.property('type', 'object');
        });

        describe('properties', () => {
          let jsonSchemaProperties;
          beforeEach(() => {
            jsonSchemaProperties = jsonSchema.properties;
          });

          it('exists', () => {
            expect(jsonSchemaProperties).to.be.ok;
          });

          it('has an additional fields section property', () => {
            expect(jsonSchemaProperties).to.have.property('additional_section');
          });

          describe('additional_section', () => {
            let additionalFields;
            beforeEach(() => {
              additionalFields = jsonSchemaProperties.additional_section;
            });

            it('exists', () => {
              expect(additionalFields).to.be.ok;
            });

            it('is a jsonSchema object', () => {
              expect(additionalFields).to.have.all.keys([
                'title',
                'description',
                'type',
                'properties',
                'required',
              ]);
            });

            it('has type: object', () => {
              expect(additionalFields).to.have.property('type', 'object');
            });

            it('sets title as section title', () => {
              expect(additionalFields).to.have.property('title', 'Additional');
            });

            it('sets description as section description', () => {
              expect(additionalFields).to.have.property('description');
            });

            it('has the single field as a property', () => {
              expect(additionalFields.properties).to.have.deep.property('agency_specific_field');
            });

            it('has jsonSchema properties', () => {
              expect(additionalFields.properties.agency_specific_field).to.have.all.keys([
                'type',
              ]);
            });
          });
        });
      });
    });

    describe('given two agency-component-specific fields', () => {
      // These are fields not matching any of the other fields. The section
      // selected is based on the isAgencySpecificFieldSection, currently hard-coded
      let agencyComponent;
      let result;

      beforeEach(() => {
        agencyComponent = {
          title: 'Office of Information Policy',
          formFields: [
            {
              name: 'agency_specific_field1',
              title: 'An agency specific field 1',
            },
            {
              name: 'agency_specific_field2',
              title: 'An agency specific field 2',
            },
          ],
        };

        result = builder.sectionedFormFromAgencyComponent(agencyComponent);
      });

      it('calls webformFieldsToJsonSchema once', () => {
        expect(spy).to.have.been.calledOnce;
      });

      describe('uiSchema', () => {
        let uiSchema;
        beforeEach(() => {
          uiSchema = result.uiSchema;
        });

        it('exists', () => {
          expect(uiSchema).to.be.ok;
        });

        it('has a single section with two fields and uiSchema properties', () => {
          expect(uiSchema).to.have.property('additional_section');
          expect(uiSchema.additional_section).to.have.all.keys([
            'agency_specific_field1',
            'agency_specific_field2',
            'ui:order',
          ]);
        });
      });

      describe('jsonSchema', () => {
        let jsonSchema;
        beforeEach(() => {
          jsonSchema = result.jsonSchema;
        });

        it('exists', () => {
          expect(jsonSchema).to.be.ok;
        });

        describe('properties', () => {
          let jsonSchemaProperties;
          beforeEach(() => {
            jsonSchemaProperties = jsonSchema.properties;
          });

          it('exists', () => {
            expect(jsonSchemaProperties).to.be.ok;
          });

          it('has a section property with its own jsonSchema properties with two fields', () => {
            expect(jsonSchemaProperties.additional_section).to.have.property('properties');
            expect(jsonSchemaProperties.additional_section.properties).to.have.all.keys([
              'agency_specific_field1',
              'agency_specific_field2',
            ]);
          });
        });
      });
    });

    describe('given two fields in different sections', () => {
      let agencyComponent;
      let result;

      beforeEach(() => {
        agencyComponent = {
          title: 'Office of Information Policy',
          formFields: [
            {
              name: 'agency_specific_field',
              title: 'An agency specific field',
            },
            {
              name: 'email', // Matches field name from contact_section
              title: 'Email ',
            },
          ],
        };

        result = builder.sectionedFormFromAgencyComponent(agencyComponent);
      });

      it('calls webformFieldsToJsonSchema for each section', () => {
        expect(spy).to.have.been.calledTwice;
        expect(spy).to.have.been.calledWith(sinon.match.array, sinon.match({ id: 'contact_section' }));
        expect(spy).to.have.been.calledWith(sinon.match.array, sinon.match({ id: 'additional_section' }));
      });

      describe('uiSchema', () => {
        let uiSchema;
        beforeEach(() => {
          uiSchema = result.uiSchema;
        });

        it('exists', () => {
          expect(uiSchema).to.be.ok;
        });

        it('has two sections', () => {
          expect(uiSchema).to.have.property('additional_section');
          expect(uiSchema).to.have.property('contact_section');
          expect(uiSchema.additional_section).to.have.all.keys([
            'ui:order',
            'agency_specific_field',
          ]);
          expect(uiSchema.contact_section).to.have.all.keys([
            'ui:order',
            'email',
          ]);
        });
      });

      describe('jsonSchema', () => {
        let jsonSchema;
        beforeEach(() => {
          jsonSchema = result.jsonSchema;
        });

        it('exists', () => {
          expect(jsonSchema).to.be.ok;
        });

        describe('properties', () => {
          let jsonSchemaProperties;
          beforeEach(() => {
            jsonSchemaProperties = jsonSchema.properties;
          });

          it('exists', () => {
            expect(jsonSchemaProperties).to.be.ok;
          });

          it('has two sections', () => {
            expect(jsonSchemaProperties).to.have.property('additional_section');
            expect(jsonSchemaProperties).to.have.property('contact_section');

            expect(jsonSchemaProperties.additional_section.properties).to.have.all.keys([
              'agency_specific_field',
            ]);
            expect(jsonSchemaProperties.contact_section.properties).to.have.all.keys([
              'email',
            ]);
          });
        });
      });
    });
  });

  describe('sectionedErrorsFromWebformErrors()', () => {
    let webformErrors;
    let errors;

    describe('given field error for section', () => {
      beforeEach(() => {
        webformErrors = {
          email: 'This is not a valid email address.',
        };

        errors = builder.sectionedErrorsFromWebformErrors(webformErrors);
      });

      it('returns an error with a section formated as a jsonschema-form id', () => {
        expect(errors).to.have.property('root_contact_section_email', webformErrors.email);
      });
    });

    describe('given field error for additional fields section', () => {
      beforeEach(() => {
        webformErrors = {
          agency_field: 'Agency specific field is not valid.',
        };

        errors = builder.sectionedErrorsFromWebformErrors(webformErrors);
      });

      it('returns an error in the additional fields section formated as a jsonschema-form id', () => {
        expect(errors).to.have.property('root_additional_section_agency_field', webformErrors.agency_field);
      });
    });
  });
});
