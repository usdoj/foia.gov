import React from 'react';
import PropTypes from 'prop-types';


function UploadProgress({ progressLoaded, progressTotal }) {
  const percentage = Math.floor(progressLoaded / progressTotal * 100);
  return (
    <div>
      { progressLoaded &&
        <progress
          value={progressLoaded}
          max={progressTotal}
        >
          {percentage}% uploaded…
        </progress>
      }
      <p>Please be patient while we upload your request.</p>
    </div>
  );
}

UploadProgress.propTypes = {
  progressLoaded: PropTypes.number,
  progressTotal: PropTypes.number,
};

UploadProgress.defaultProps = {
  progressTotal: 0,
  progressLoaded: 0,
};


export default UploadProgress;
