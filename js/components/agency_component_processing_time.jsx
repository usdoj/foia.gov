import React from 'react';
import PropTypes from 'prop-types';

function mostRecentStats(requestTimeStats) {
  const mostRecentYear = Object.keys(requestTimeStats)
    .reduce((mostRecent, year) => (mostRecent && mostRecent > year ? mostRecent : year), null);

  return requestTimeStats[mostRecentYear];
}


function AgencyComponentProcessingTime({ requestTimeStats }) {
  const recentStats = mostRecentStats(requestTimeStats);
  if (!recentStats) {
    // No output if there are no stats
    return null;
  }

  return (
    <div>
      <h5>Median processing time</h5>
      <p>{ recentStats.simple_median_days } working days for simple requests</p>
      <p>{ recentStats.complex_median_days } working days for complex requests</p>
    </div>
  );
}

AgencyComponentProcessingTime.propTypes = {
  requestTimeStats: PropTypes.object,
};

AgencyComponentProcessingTime.defaultProps = {
  requestTimeStats: {},
};


export default AgencyComponentProcessingTime;
