const personnelDisplayTitles = {
  foia_officers: 'FOIA Officer',
  field_misc: '',
  service_centers: 'FOIA Requester Service Center',
  public_liaisons: 'FOIA Public Liaison',
};

/*
 * Returns a list of the named personnel with default title added
 */
function personnel(agencyComponent, personnelType) {
  const defaultDisplayTitle = personnelDisplayTitles[personnelType];
  return (agencyComponent[personnelType] || [])
    .map((person) => ({ ...person, title: person.title || defaultDisplayTitle }));
}

export default {
  personnel,
};
