import React from 'react';
import PropTypes from 'prop-types';

function tryRoundInt(string) {
  const number = Math.ceil(parseFloat(string, 10));
  return Number.isNaN(number) ? string : number;
}

function AgencyComponentProcessingTime({ agencyComponent }) {
  if (!agencyComponent.request_data_year) {
    // No output if there are no stats
    return null;
  }

  const complex_average_days = tryRoundInt(agencyComponent.request_data_complex_average_days);
  const simple_average_days = tryRoundInt(agencyComponent.request_data_simple_average_days);
  return (
    <div className="agency-info_processing-time">
      <h4>
        Average processing time for
        {' '}
        {agencyComponent.request_data_year}
      </h4>
      { simple_average_days && (
      <p>
        {simple_average_days}
        {' '}
        working days for simple requests
      </p>
      ) }
      { complex_average_days && (
      <p>
        {complex_average_days}
        {' '}
        working days for complex requests
      </p>
      ) }
    </div>
  );
}

AgencyComponentProcessingTime.propTypes = {
  agencyComponent: PropTypes.object.isRequired,
};

export default AgencyComponentProcessingTime;
