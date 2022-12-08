/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withRouter } from 'react-router-dom';

function FoiaDatasetDownload() {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        <h1>FOIA Data Set Downloads</h1>
        <p>The following compressed files are complete archives of the  FOIA Data sets for the years 2008 through 2019.</p>
        <ul>
          <li><a href="/2020-FOIASetFull.zip">Download the full 2020 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2019-FOIASetFull.zip">Download the full 2019 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2018-FOIASetFull.zip">Download the full 2018 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2017-FOIASetFull.zip">Download the full 2017 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2016-FOIASetFull.zip">Download the full 2016 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2015-FOIASetFull.zip">Download the full 2015 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2014-FOIASetFull.zip">Download the full 2014 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2013-FOIASetFull.zip">Download the full 2013 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2012-FOIASetFull.zip">Download the full 2012 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2011-FOIASetFull.zip">Download the full 2011 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2010-FOIASetFull.zip">Download the full 2010 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2009-FOIASetFull.zip">Download the full 2009 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2008-FOIASetFull.zip">Download the full 2008 FOIA Data set</a> (.zip format)</li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(FoiaDatasetDownload);
