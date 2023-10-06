/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import PropTypes from 'prop-types';

import FoiaPersonnel from './foia_personnel';
import FoiaSubmissionAddress from './foia_submission_address';
import foiaPersonnel from '../util/foia_personnel';

function ContactInformation({ agencyComponent }) {
  // Grab contacts
  const foiaOfficerFoiaPersonnel = foiaPersonnel.personnel(agencyComponent, 'foia_officers').map((item) => (
    <div key={item.id} className="contact-information_section" tabIndex={0}>
      <FoiaPersonnel foiaPersonnel={item} />
    </div>
  ));
  const serviceCenterFoiaPersonnel = foiaPersonnel.personnel(agencyComponent, 'service_centers').map((item) => (
    <div key={item.id} className="contact-information_section" tabIndex={0}>
      <FoiaPersonnel foiaPersonnel={item} />
    </div>
  ));
  const publicLiaisonFoiaPersonnel = foiaPersonnel.personnel(agencyComponent, 'public_liaisons').map((item) => (
    <div key={item.id} className="contact-information_section" tabIndex={0}>
      <FoiaPersonnel foiaPersonnel={item} />
    </div>
  ));

  return (
    <div className="contact-information">
      {foiaOfficerFoiaPersonnel}
      {serviceCenterFoiaPersonnel}
      {publicLiaisonFoiaPersonnel}
      <div className="contact-information_section" tabIndex={0}>
        <FoiaSubmissionAddress
          submissionAddress={agencyComponent.submission_address}
          paperReceiver={agencyComponent.paper_receiver}
        />
        { agencyComponent.email
          && (
          <p className="agency-info_email">
            <a tabIndex={0} href={`mailto:${agencyComponent.email}`}>{ agencyComponent.email }</a>
          </p>
          )}
      </div>
    </div>
  );
}

ContactInformation.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};

export default ContactInformation;
