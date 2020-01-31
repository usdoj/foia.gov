import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'immutable';
import FoiaTooltip from './foia_tooltip';
import FoiaReportFormCheckboxWidget from './foia_report_form_checkbox_widget';
import { reportActions } from '../actions/report';


/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionThree extends Component {
  static handleSelectNone(event) {
    reportActions.updateSelectedFiscalYears([]);
    event.preventDefault();
  }

  constructor(props) {
    super(props);

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelectAll(event) {
    reportActions.updateSelectedFiscalYears([...this.props.fiscalYears]);
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value.toString();
    const selected = target.checked ?
      [...this.props.selectedFiscalYears].concat([value]) :
      [...this.props.selectedFiscalYears].filter(year => value !== year);
    reportActions.updateSelectedFiscalYears(selected);
  }

  render() {
    const { fiscalYears, selectedFiscalYears } = this.props;
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              3. Select Fiscal Years
              <FoiaTooltip text={'<p>Select a Fiscal Year to view the data for that year. You may select multiple years, or you may view all years of available data.</p>'} />
            </legend>
            <fieldset className="usa-fieldset-inputs">
              <legend className="usa-sr-only">Select Fiscal Years</legend>
              <ul className="usa-unstyled-list usa-grid checkbox-list">
                { fiscalYears.map(fiscalYear => (
                  <li className="usa-width-one-sixth" key={fiscalYear}>
                    <FoiaReportFormCheckboxWidget
                      value={fiscalYear}
                      checked={selectedFiscalYears.includes(fiscalYear)}
                      onChange={this.handleChange}
                    />
                  </li>
                ))}
              </ul>
              <div className="form-group">
                <ul className="inline-list">
                  <li><a href="#" onClick={this.handleSelectAll}>Select All</a></li>
                  <li><a href="#" onClick={FoiaReportFormSectionThree.handleSelectNone}>Select None</a></li>
                </ul>
              </div>
            </fieldset>
          </fieldset>
        </div>
      </div>
    );
  }
}

FoiaReportFormSectionThree.propTypes = {
  fiscalYears: PropTypes.instanceOf(List),
  selectedFiscalYears: PropTypes.array,
};

FoiaReportFormSectionThree.defaultProps = {
  fiscalYears: List(),
  selectedFiscalYears: [],
};

export default FoiaReportFormSectionThree;
