import React from 'react';
import PropTypes from 'prop-types';

function Four04({ children }) {
  return (
    <div>
      <h1>Not found</h1>
      <p>We’re sorry, we couldn’t find the page you are looking for.</p>
      { children || <p>You can click back, or <a href="/">start over</a>.</p> }
    </div>
  );
}

Four04.propTypes = {
  children: PropTypes.node,
};

Four04.defaultProps = {
  children: null,
};

export default Four04;
