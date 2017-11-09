import React from 'react';
import PropTypes from 'prop-types';

function NotFoundPage({ children }) {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        <h1>Not found</h1>
        <p>We’re sorry, we couldn’t find the page you are looking for.</p>
        <p>This is the first iteration of the new FOIA.gov. We’ll continue to 
          improve upon this site in the future. Please let us know if you think 
          something is missing or broken by 
          <a href="mailto:National.FOIAPortal@usdoj.gov">submitting feedback</a>.</p>
        { children || <p>You can also click back, or <a href="/">start over</a>.</p> }
      </div>
    </div>
  );
}

NotFoundPage.propTypes = {
  children: PropTypes.node,
};

NotFoundPage.defaultProps = {
  children: null,
};

export default NotFoundPage;
