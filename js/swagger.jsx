import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SwaggerPage from './pages/swagger_page';

const history = createBrowserHistory();
history.push('/swagger.html');
render(
  <Router history={history}>
    <SwaggerPage />
  </Router>,
  document.getElementById('swagger-api-react-app'),
);
