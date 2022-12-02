import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FoiaDatasetDownload from 'pages/foia_dataset_download';

const history = createBrowserHistory();
history.push('/foia-dataset-download.html');

render(
  <Router history={history}>
    <FoiaDatasetDownload />
  </Router>,
  document.getElementById('dataset-download-react-app'),
);
