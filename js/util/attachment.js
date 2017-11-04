/* eslint-disable import/prefer-default-export */
export function dataUrlToAttachment(dataUrl) {
  if (!dataUrl || !dataUrl.length) {
    return null;
  }

  const [propertiesString, filedata] = dataUrl.split(':', 2)[1].split(',');
  const properties = propertiesString.split(';');
  const content_type = properties.shift();
  return properties.reduce((attachment, property) => {
    const [key, value] = property.split('=');
    if (key === 'filename') {
      attachment[key] = decodeURIComponent(value);
    }

    if (key === 'filesize') {
      attachment[key] = parseInt(value, 10);
    }

    return attachment;
  }, { content_type, filedata });
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
