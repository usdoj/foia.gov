/*
 * Utilities for managing the request form.
 *
 * We're using react-jsonschema-form to render a form from a given jsonSchema
 * and uiSchema. The jsonSchema is flexible, so you can use nested jsonSchema
 * definitions (part of the jsonSchema standard) which can be rendered into
 * different fieldsets, giving us a form divided up into sections.
 *
 * request_form_to_json_schema works on a single section, accepting a list of
 * fields to include and some section information (title, description, etc).
 *
 * form_sections accepts a single agencyComponent, sorts its fields into
 * different sections (currently hardcoded), then delegates to
 * request_form_to_json_schema to build individual sections. Finally, it merges
 * the individual sections' jsonSchema and uiSchema into a unified one.
 */

import sectionedForm from './sectioned_form';
import wfjs from './webform_to_json_schema';

export default {
  mergeSectionFormData: sectionedForm.mergeSectionFormData,
  sectionedFormFromAgencyComponent: sectionedForm.sectionedFormFromAgencyComponent,
  webformFieldsToJsonSchema: wfjs.webformFieldsToJsonSchema,
};
