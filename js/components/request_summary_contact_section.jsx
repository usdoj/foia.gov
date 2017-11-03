import React from 'react';
import PropTypes from 'prop-types';

function RequestSummaryContactSection({ formData }) {
  const data = formData.requester_contact;
  return (
    <div className="request-summary_section">
      <h5>Name</h5>
      <p>{[data.name_first, data.name_last].join(' ')}</p>
      { data.mailing_address_line_1 &&
        <div>
          <h5>Mailing address</h5>
          <address>
            <p>{ data.address_line_1 }</p>
            <p>{ data.address_line_2}</p>
            <p>{ data.address_city }, { data.address_state_province } { data.address_zip_postal_code }</p>
            <p>{ data.address_country }</p>
          </address>
        </div>
      }
      { data.phone_number &&
        <div>
          <h5>Phone number</h5>
          <p>{ data.phone_number }</p>
        </div>
      }
      { data.company_organization &&
        <div>
          <h5>Company/organization</h5>
          <p>{ data.company_organization }</p>
        </div>
      }
      { data.email &&
        <div>
          <h5>Email</h5>
          <p>{ data.email }</p>
        </div>
      }
    </div>
  );
}


RequestSummaryContactSection.propTypes = {
  formData: PropTypes.object.isRequired,
};


export default RequestSummaryContactSection;
