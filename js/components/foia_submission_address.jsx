import React from 'react';
import PropTypes from 'prop-types';


function FoiaSubmissionAddress({ submissionAddress }) {
  const {
    additional_name,
    address_line1,
    address_line2,
    locality, // city
    administrative_area, // state
    postal_code,
  } = submissionAddress;

  return (
    <address className="submission-help_mailing">
      <p>{ additional_name }</p>
      <p>{ address_line1 }</p>
      <p>{ address_line2 }</p>
      <p>{ `${locality}, ${administrative_area} ${postal_code}` }</p>
    </address>
  );
}

FoiaSubmissionAddress.propTypes = {
  submissionAddress: PropTypes.object,
};

FoiaSubmissionAddress.defaultProps = {
  submissionAddress: null,
};


export default FoiaSubmissionAddress;
