import React from 'react';
import { render } from 'react-dom';

import FOIARequestFormApp from './foia_request_form_app';
import Tabs from 'components/tabs';

render(<FOIARequestFormApp />, document.getElementById('react-app'));
render(<Tabs />, document.getElementById('react-tabs'));
