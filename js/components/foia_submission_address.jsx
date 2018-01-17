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
  } = submissionAddress || {};

  // Address line seems to have been parsed wrong, it seems to be: name,
  // title, department, suite. And then address_line2 is actually line1.
  const [name, title, department, suite] = (address_line1 || '').split(',', 4);

  return (
    <address className="agency-info_mailing-address">
      <div>{ additional_name }</div>
      <div>{ [name, title].join(',') }</div>
      <div>{ department }</div>
      <div>{ suite }</div>
      <div>{ address_line2 }</div>
      <div>{ `${locality}, ${administrative_area} ${postal_code}` }</div>
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
