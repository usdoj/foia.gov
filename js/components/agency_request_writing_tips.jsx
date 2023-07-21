import React from 'react';
import PropTypes from 'prop-types';

function AgencyRequestWritingTips(props) {
  return (
    <div className="request_writing_tips">
      <h1>Before you start your request, here are a few tips for writing your request.</h1>
      <p>The description of the records you are requesting is important. The scope of your request can impact how quickly an agency can respond to your request. Your description should:</p>
      <ul>
        <li>Be as clear and specific as possible</li>
        <li>Include date ranges, if applicable</li>
        <li>Provide enough detail so that the agency can determine which records are being requested and locate them with a reasonable amount of effort.</li>
      </ul>
      <button className="request_writing_tips-button" onClick={props.closeTips}>Start FOIA request</button>
    </div>
  );
}

AgencyRequestWritingTips.propTypes = {
  closeTips: PropTypes.func.isRequired,
};

export default AgencyRequestWritingTips;
