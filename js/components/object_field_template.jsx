/* eslint-disable */
import React from 'react';

// Would be nice if this template was exported so we could just wrap it without
// having to copy/paste it.
// https://github.com/mozilla-services/react-jsonschema-form/blob/8e9aec57dd2421f37073ec0eac917e0840dde0b3/src/components/fields/ObjectField.js#L10
function ObjectFieldTemplate(props) {
  const { TitleField, DescriptionField } = props;
  return (
    <fieldset>
      {(props.uiSchema["ui:title"] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema["ui:title"]}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      {props.properties.map(prop => prop.content)}
      <div className="foia-request-form_nav-top">
        <a href="#main">Return to top</a>
      </div>
    </fieldset>
  );
}


export default ObjectFieldTemplate;
