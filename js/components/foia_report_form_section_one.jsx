import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';

/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionOne extends React.Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              1. Select Agencies or Components
              <FoiaTooltip text="Select the type of FOIA data you would like to view. The data comes from agencies' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary." />
            </legend>
            <div className="form-group field">
              <label htmlFor="data_type"><strong>Agency or Component Name</strong></label>
              <span className="twitter-typeahead usa-search-bg-light usa-reset-width">
                <input type="text" id="search-field-big" name="search" className=" usa-reset-width" autoComplete="off" spellCheck="false" />
                <button className="usa-button usa-button-outline usa-button-small" type="submit" href="#">Select Agency Components</button>
              </span>
            </div>
            <div className="form-group field use-dark-icons">
              <a href="#"><span className="icon-plus" /><p className="usa-alert-text">Add Another Agency or Component</p></a>
            </div>
          </fieldset>
        </div>
        <div className="clear">&nbsp;</div>
        <div className="form-group usa-width-one-half visually-hidden">
          {/* Begin Modal Inner HTML */}
          <div className="form-group">
            <div className="usa-grid">
              <h3 className="sans">Select Agencies or Components</h3>
              <fieldset className="usa-fieldset-inputs">
                <ul className="usa-unstyled-list usa-grid checkbox-list">
                  <li className="usa-width-one-third">
                    <input id="Agency-1" type="checkbox" name="Agency-1" value="Agency-1" />
                    <label htmlFor="Agency-1">Agency 1</label>
                  </li>
                  <li className="usa-width-one-third">
                    <input id="Agency-2" type="checkbox" name="Agency-2" value="Agency-2" />
                    <label htmlFor="Agency-2">Agency 2</label>
                  </li>
                  <li className="usa-width-one-third">
                    <input id="Agency-3" type="checkbox" name="Agency-3" value="Agency-3" />
                    <label htmlFor="Agency-3">Agency 3</label>
                  </li>
                </ul>
                <div className="form-group_footer">
                  <ul className="inline-list">
                    <li><a href="#">Select All</a></li>
                    <li><a href="#">Select None</a></li>
                  </ul>
                  <button className="usa-button usa-button-primary-alt">Submit</button>
                  <button className="usa-button usa-button-outline">Cancel</button>
                </div>
              </fieldset>
            </div>
          </div>
          {/* End Modal Inner HTML */}
        </div>
      </div>
    );
  }
}
export default FoiaReportFormSectionOne;
