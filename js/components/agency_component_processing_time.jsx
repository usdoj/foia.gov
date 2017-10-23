import React from 'react';
import PropTypes from 'prop-types';


function AgencyComponentProcessingTime({ agencyComponent }) {
  if (!agencyComponent.request_data_year) {
    // No output if there are no stats
    return null;
  }

  const {
    request_data_complex_median_days: complex_median_days,
    request_data_simple_median_days: simple_median_days,
  } = agencyComponent;
  return (
    <div>
      <h5>Median processing time for {agencyComponent.request_data_year}</h5>
      { simple_median_days && <p>{simple_median_days} working days for simple requests</p> }
      { complex_median_days && <p>{complex_median_days} working days for complex requests</p> }
    </div>
  );
}

AgencyComponentProcessingTime.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};


export default AgencyComponentProcessingTime;
