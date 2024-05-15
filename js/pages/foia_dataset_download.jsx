/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withRouter } from 'react-router-dom';

function FoiaDatasetDownload() {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        <h1>FOIA Data Set Downloads</h1>
        <p>The following compressed files are complete archives of the agency FOIA data sets for the years 2008 through 2023 in .xml format.</p>
        <ul>
          <li><a href="/2023-FOIASetFull.zip">Download the full 2023 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2022-FOIASetFull.zip">Download the full 2022 FOIA Data set</a> (.zip format)</li>
          <li><a href="/2021-FOIASetFull.zip">Download the full 2021 FOIA Data set</a> (.zip format)</li>
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
      <div className="usa-width-one-whole pt5">
        <p>The following compressed files are complete archives of government wide FOIA data sets for the years 2008 through 2023 in .csv format.</p>
        <ul>
          <li><a href="/downloads/all_agencies_csv_2023.zip">Download the full 2023 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2022.zip">Download the full 2022 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2021.zip">Download the full 2021 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2020.zip">Download the full 2020 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2019.zip">Download the full 2019 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2018.zip">Download the full 2018 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2017.zip">Download the full 2017 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2016.zip">Download the full 2016 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2015.zip">Download the full 2015 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2014.zip">Download the full 2014 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2013.zip">Download the full 2013 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2012.zip">Download the full 2012 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2011.zip">Download the full 2011 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2010.zip">Download the full 2010 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2009.zip">Download the full 2009 All Agency Data set</a> (.zip format)</li>
          <li><a href="/downloads/all_agencies_csv_2008.zip">Download the full 2008 All Agency Data set</a> (.zip format)</li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(FoiaDatasetDownload);
