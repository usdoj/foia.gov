import React from 'react';
import PropTypes from 'prop-types';

function UploadProgress({ progressLoaded, progressTotal }) {
  const percentage = Math.floor(progressLoaded / progressTotal * 100);
  // Use a fallback in case we're not receiving progress events. In that case
  // the requester will just see "Uploading…" until the request is complete.
  const content = progressLoaded ? `${percentage}% uploaded…` : 'Uploading…';
  return (
    <button
      disabled
      className="usa-button usa-button-big usa-button-primary-alt"
    >
      { content }
    </button>
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
