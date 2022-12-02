import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import FoiaContactDownload from 'pages/foia_contact_download';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
history.push('/foia-contact-download.html');

render(
  <Router history={history}>
    <FoiaContactDownload />
  </Router>,
  document.getElementById('contact-download-react-app'),
);
