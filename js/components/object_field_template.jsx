/* eslint-disable */
import React from 'react';

// Would be nice if this template was exported so we could just wrap it without
// having to copy/paste it.
// https://github.com/mozilla-services/react-jsonschema-form/blob/8e9aec57dd2421f37073ec0eac917e0840dde0b3/src/components/fields/ObjectField.js#L10
function CustomObjectFieldTemplate(ObjectFieldTemplateProps) {

  const { formContext = {}} = ObjectFieldTemplateProps;
  const steps = formContext.steps || [];
  const step = steps.indexOf(ObjectFieldTemplateProps.idSchema.$id) + 1;

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
        )}

        {ObjectFieldTemplateProps.description && (
          <div id={`${ObjectFieldTemplateProps.idSchema.$id}__description`} className="field-description">
            <span>
              <p>{ObjectFieldTemplateProps.description}</p>
            </span>
          </div>
        )}
        {ObjectFieldTemplateProps.properties.map(prop => prop.content)}
        <div className="foia-request-form_nav-top">
          <a href="#main">Return to top</a>
        </div>
      </fieldset>
    </div>
  );
}

export default CustomObjectFieldTemplate;
