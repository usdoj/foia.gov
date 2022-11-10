import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwaggerUI from 'swagger-ui-react';
import SwaggerSpec from '../../swagger.json';

class SwaggerPage extends Component {
  static handleResponse(response) {
    if (response.body.error.code === 'API_KEY_MISSING') {
      // eslint-disable-next-line no-alert
      alert(`API Authorization Required\n${response.body.error.message}`);
    }
  }

  render() {
    return (
      <div className="usa-grid">
        <div className="usa-width-one-whole">
          <SwaggerUI
            responseInterceptor={SwaggerPage.handleResponse}
            spec={SwaggerSpec}
            displayRequestDuration
            showExtensions
            showCommonExtensions
            syntaxHighlight
            requestSnippetsEnabled
            requestSnippets
            withCredentials
            defaultModelsExpandDepth={-1}
            persistAuthorization
            tryItOutEnabled
            filter
            history={this.props.history}
            supportedSubmitMethods={['get', 'options', 'head', 'patch', 'trace']}
          />
        </div>
      </div>
    );
  }
}

SwaggerPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SwaggerPage);
