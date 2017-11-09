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
  const data = formData.requester_contact;
  const fullName = name(data);

  return (
    <section key={section.id}>
      <h3>{section.title}</h3>
      <div className="request-summary_section">
        { fullName &&
          <div>
            <h5>Name</h5>
            <p>{fullName}</p>
          </div>
        }
        { data.address_line1 &&
          <div>
            <h5>Mailing address</h5>
            <address>
              <p>{ data.address_line1 }</p>
              <p>{ data.address_line2}</p>
              <p>
                { data.address_city },
                {' '}
                { data.address_state_province }
                {' '}
                { data.address_zip_postal_code }
              </p>
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
        { data.fax_number &&
          <div>
            <h5>Fax number</h5>
            <p>{ data.fax_number }</p>
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
    </section>
  );
}


RequestSummaryContactSection.propTypes = {
  formData: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
};


export default RequestSummaryContactSection;
