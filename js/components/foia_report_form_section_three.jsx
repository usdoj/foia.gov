import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';

/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionThree extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              3. Select Fiscal Years
              <FoiaTooltip
                text={"Select the years of FOIA data you would like to view. The data comes from agencies\' Annual FOIA Reports. To learn more about the data, view the terms in the Glossary."}
              />
            </legend>
            <fieldset className="usa-fieldset-inputs">
              <legend className="usa-sr-only">Select Fiscal Years</legend>
              <ul className="usa-unstyled-list usa-grid checkbox-list">
                <li className="usa-width-one-sixth">
                  <input id="2019" type="checkbox" name="fiscal-year" value="2019" />
                  <label htmlFor="2019">2019</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2018" type="checkbox" name="fiscal-year" value="2018" />
                  <label htmlFor="2018">2018</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2017" type="checkbox" name="fiscal-year" value="2017" />
                  <label htmlFor="2017">2017</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2016" type="checkbox" name="fiscal-year" value="2016" />
                  <label htmlFor="2016">2016</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2015" type="checkbox" name="fiscal-year" value="2015" />
                  <label htmlFor="2015">2015</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2014" type="checkbox" name="fiscal-year" value="2014" />
                  <label htmlFor="2014">2014</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2013" type="checkbox" name="fiscal-year" value="2013" />
                  <label htmlFor="2013">2013</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2012" type="checkbox" name="fiscal-year" value="2012" />
                  <label htmlFor="2012">2012</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2011" type="checkbox" name="fiscal-year" value="2011" />
                  <label htmlFor="2011">2011</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2010" type="checkbox" name="fiscal-year" value="2010" />
                  <label htmlFor="2010">2010</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2009" type="checkbox" name="fiscal-year" value="2009" />
                  <label htmlFor="2009">2009</label>
                </li>
                <li className="usa-width-one-sixth">
                  <input id="2008" type="checkbox" name="fiscal-year" value="2008" />
                  <label htmlFor="2008">2008</label>
                </li>
              </ul>
              <div className="form-group">
                <ul className="inline-list">
                  <li><a href="#">Select All</a></li>
                  <li><a href="#">Select None</a></li>
                </ul>
              </div>
            </fieldset>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default FoiaReportFormSectionThree;
