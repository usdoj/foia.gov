/* eslint-disable */
import React from 'react';
import { ArrayFieldTemplateProps, ErrorListProps, FieldTemplateProps, ObjectFieldTemplateProps, RJSFSchema } from "@rjsf/utils";

// Would be nice if this template was exported so we could just wrap it without
// having to copy/paste it.
// https://github.com/mozilla-services/react-jsonschema-form/blob/8e9aec57dd2421f37073ec0eac917e0840dde0b3/src/components/fields/ObjectField.js#L10
function CustomObjectFieldTemplate(ObjectFieldTemplateProps) {
  //const {props} = ObjectFieldTemplateProps;

  console.log("ObjectFieldTemplateProps", ObjectFieldTemplateProps );

  const { TitleField, DescriptionField, formContext = {}} = ObjectFieldTemplateProps;
  // const { TitleField, DescriptionField, formContext = {}} = props;
  const steps = formContext.steps || [];
  const step = steps.indexOf(ObjectFieldTemplateProps.idSchema.$id) + 1;

  console.log(TitleField);
  console.log("DescriptionField",DescriptionField);
  //
  // console.log("TitleField", TitleField );
  // console.log("ObjectFieldTemplateProps.uiSchema[\"ui:title\"] ", ObjectFieldTemplateProps.uiSchema["ui:title"] );
  // console.log("DescriptionField", DescriptionField );
  // console.log("props", props );
  // console.log("${ObjectFieldTemplateProps.idSchema.$id}__title: ",`${ObjectFieldTemplateProps.idSchema.$id}__title` );
  return (
    <div>
      { step > 0 &&
        <div className="foia-request-form_inline-progress">
          Step {step} of {steps.length + 1}
        </div>
      }
      <fieldset>
        {(ObjectFieldTemplateProps.uiSchema["ui:title"] || ObjectFieldTemplateProps.title) && (

          <legend id={`${ObjectFieldTemplateProps.idSchema.$id}__title`}>{ObjectFieldTemplateProps.title}</legend>

          // <TitleField
          //   id={`${ObjectFieldTemplateProps.idSchema.$id}__title`}
          //   title={ObjectFieldTemplateProps.title || ObjectFieldTemplateProps.uiSchema["ui:title"]}
          //   required={ObjectFieldTemplateProps.required}
          //   formContext={ObjectFieldTemplateProps.formContext}
          // />
          // <TitleField
          //   id={`${ObjectFieldTemplateProps.idSchema.$id}__title`}
          //   title={ObjectFieldTemplateProps.title || ObjectFieldTemplateProps.uiSchema["ui:title"]}
          //   //required={ObjectFieldTemplateProps.required}
          //   //formContext={ObjectFieldTemplateProps.formContext}
          // />
        )}

        {ObjectFieldTemplateProps.description && (
          <div id={`${ObjectFieldTemplateProps.idSchema.$id}__description`} className="field-description">
            <span>
              <p>{ObjectFieldTemplateProps.description}</p>
            </span>
          </div>
          // <DescriptionField
          //   id={`${ObjectFieldTemplateProps.idSchema.$id}__description`}
          //   description={ObjectFieldTemplateProps.description}
          //   formContext={ObjectFieldTemplateProps.formContext}
          // />
        )}
        {ObjectFieldTemplateProps.properties.map(prop => prop.content)}
        <div className="foia-request-form_nav-top">
          <a href="#main">Return to top</a>
        </div>
      </fieldset>
    </div>
  );
}
// Check the render method of `CustomObjectFieldTemplate`.
//     in CustomObjectFieldTemplate (created by ObjectField)

export default CustomObjectFieldTemplate;
