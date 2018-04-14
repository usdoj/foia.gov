import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import ContactDownloadButton from 'components/contact_download';

render(
  <ContactDownloadButton />,
  document.getElementById('contact-download-react-app'),
);
