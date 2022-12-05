import React from 'react';
import { withRouter } from 'react-router-dom';
import ContactDownloadButton from './contact_download';

function FoiaContactDownload() {
  return (
    <div className="usa-grid">
      <div className="usa-width-one-whole">

        <h1>FOIA Contact Download</h1>

        <p>The following file is the complete listing of all FOIA contacts across federal departments and agencies.</p>

        <ContactDownloadButton />
        <div id="contact-download-react-app" />

      </div>
    </div>
  );
}

export default withRouter(FoiaContactDownload);
