import React from 'react';
import PropTypes from 'prop-types';

function name(requester) {
  const nameParts = [];

  if (requester.name_first) {
    nameParts.push(requester.name_first);
  }

  if (requester.name_last) {
    nameParts.push(requester.name_last);
  }

  return nameParts.join(' ');
}

function RequestSummaryContactSection({ formData, section }) {
  const requesterContact = formData.requester_contact;
  const fullName = name(requesterContact);

  return (
    <section key={section.id}>
      <h3>{section.title}</h3>
      <div className="request-summary_section">
        { fullName
          && (
          <div>
            <h5>Name</h5>
            <p>{fullName}</p>
          </div>
          )}
        { requesterContact.address_line1
          && (
          <div>
            <h5>Mailing address</h5>
            <address>
              <p>{ requesterContact.address_line1 }</p>
              <p>{ requesterContact.address_line2}</p>
              <p>
                { requesterContact.address_city && `${requesterContact.address_city},` }
                {' '}
                { requesterContact.address_state_province }
                {' '}
                { requesterContact.address_state_province_international }
                {' '}
                { requesterContact.address_zip_postal_code }
              </p>
              <p>{ requesterContact.address_country }</p>
            </address>
          </div>
          )}
        { requesterContact.phone_number
          && (
          <div>
            <h5>Phone number</h5>
            <p>{ requesterContact.phone_number }</p>
          </div>
          )}
        { requesterContact.fax_number
          && (
          <div>
            <h5>Fax number</h5>
            <p>{ requesterContact.fax_number }</p>
          </div>
          )}
        { requesterContact.company_organization
          && (
          <div>
            <h5>Company/organization</h5>
            <p>{ requesterContact.company_organization }</p>
          </div>
          )}
        { requesterContact.email
          && (
          <div>
            <h5>Email</h5>
            <p>{ requesterContact.email }</p>
          </div>
          )}
      </div>
    </section>
  );
}

RequestSummaryContactSection.propTypes = {
  formData: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};

export default RequestSummaryContactSection;
