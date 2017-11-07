/* eslint-disable import/prefer-default-export */
export function dataUrlToAttachment(dataUrl) {
  if (!dataUrl || !dataUrl.length) {
    return [];
  }

  // We augment the data url to include properties we need for the API. It
  // should look like this:
  // data:text/plain;filename=foo.txt;filesize=445;base64,AAAAA=
  // We add these properties. Out of the box, react-jsonschema-form also uses a
  // data url but they only include a `name` attribute.
  const [propertiesString, filedata] = dataUrl.split(':', 2)[1].split(',');
  const properties = propertiesString.split(';');
  const content_type = properties.shift();

  // Return an array of a single attachment
  return [properties.reduce((attachment, property) => {
    const [key, value] = property.split('=');
    if (key === 'filename') {
      attachment[key] = decodeURIComponent(value);
    }

    if (key === 'filesize') {
      attachment[key] = parseInt(value, 10);
    }

    return attachment;
  }, { content_type, filedata })];
}

// Returns a list of field names that are file fields.
export function findFileFields(requestForm) {
  return Object.keys(requestForm.uiSchema)
    .map((sectionId) => {
      const uiSchemaSection = requestForm.uiSchema[sectionId];

      // Find file fields in this section
      return Object.keys(uiSchemaSection)
        .filter(fieldName => uiSchemaSection[fieldName]['ui:widget'] === 'file');
    })
    .reduce((fileFields, sectionFileFields) => fileFields.concat(sectionFileFields), []);
}
