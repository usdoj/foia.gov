import React from 'react';
import PropTypes from 'prop-types';


function AgencyComponentProcessingTime({ agencyComponent }) {
  if (!agencyComponent.request_data_year) {
    // No output if there are no stats
    return null;
  }

  const {
    request_data_complex_average_days: complex_average_days,
    request_data_simple_average_days: simple_average_days,
  } = agencyComponent;
  return (
    <div>
      <h5>Average processing time for {agencyComponent.request_data_year}</h5>
      { simple_average_days && <p>{simple_average_days} working days for simple requests</p> }
      { complex_average_days && <p>{complex_average_days} working days for complex requests</p> }
    </div>
  );
}

AgencyComponentProcessingTime.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};


export default AgencyComponentProcessingTime;
