/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withRouter } from 'react-router-dom';

function FoiaDatasetDownload() {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        <h1>FOIA XML Schema</h1>
        <p>
          Federal agencies publish FOIA information   in accordance with guidelines prepared by the U. S. Department of Justice   Office of Information Policy. These guidelines, available <a href="http://www.justice.gov/oip/foiapost/guidance-annualreport-052008.pdf" target="_blank" rel="noreferrer">here</a>, describe the format and meaning of FOIA annual report information. In   addition, a <em>FOIA Annual Report XML schema</em> has been developed   allowing agency FOIA annual report information to be represented and   exchanged in a standardized format. This XML schema closely follows   the structure and terminology of the guidance document, and conforms to the NIEM standard (<a href="http://niem.gov" target="_blank" rel="noreferrer">http://niem.gov</a>).
        </p>
        <p>
          All agency data available through reports and graphs on the <a href="/data.html">FOIA.gov</a> website is also available  for public download as XML documents conforming to the FOIA Annual Report XML schema at the link below. This enables any kind of  offline processing, storage, comparison, or mashup which may be desired.
        </p>
        <p>
          The entire IEPD package may also be downloaded directly by clicking on the following link [<a href="/iepd/FOIA_Annual_Report_v2.2.zip">Download IEPD</a>].
        </p>
        <p>
          Within this IEPD package you can find the XML schema defined in <em>exchange_files/schema/extension/FoiaAnnualReportExtensions.xsd</em>. Note that this definition inherits from others, which can be found in the package as well, under <em>exchange_files/schema/Subset/niem/</em>.
        </p>
        <h3>FOIA Data Set Downloads</h3>
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
