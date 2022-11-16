import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwaggerUI from 'swagger-ui-react';
import SwaggerSpec from '../../swagger.json';

function handleResponse(response) {
  if (response.status !== 200) {
    if (response.body.error.code === 'API_KEY_MISSING') {
      // eslint-disable-next-line no-alert
      alert(`API Authorization Required\n${response.body.error.message}`);
    }
  }
  return response;
}

function SwaggerPage(props) {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        <SwaggerUI
          responseInterceptor={handleResponse}
          spec={SwaggerSpec}
          displayRequestDuration
          syntaxHighlight
          persistAuthorization
          tryItOutEnabled
          deepLinking
          history={props.history}
          supportedSubmitMethods={['get', 'options', 'head', 'patch', 'trace']}
        />
      </div>
    </div>
  );
}

SwaggerPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SwaggerPage);
