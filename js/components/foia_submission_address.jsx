import React from 'react';
import PropTypes from 'prop-types';


function FoiaSubmissionAddress({ submissionAddress, paperReceiver }) {
  const {
    address_line1,
    address_line2,
    locality, // city
    administrative_area, // state
    postal_code,
  } = submissionAddress || {};

  const { name, title } = paperReceiver || {};

  return (
    <address className="agency-info_mailing-address">
      { name && <span>{name}<br /></span> }
      { title && <span>{title}<br /></span> }
      { address_line1 && <span>{address_line1}<br /></span> }
      { address_line2 && <span>{address_line2}<br /></span> }
      <span>{ `${locality}, ${administrative_area} ${postal_code}` }</span>
    </address>
  );
}

FoiaSubmissionAddress.propTypes = {
  paperReceiver: PropTypes.object,
  submissionAddress: PropTypes.object,
};

FoiaSubmissionAddress.defaultProps = {
  paperReceiver: null,
  submissionAddress: null,
};


export default FoiaSubmissionAddress;
