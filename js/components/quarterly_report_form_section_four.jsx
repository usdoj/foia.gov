import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'immutable';
import FoiaTooltip from './foia_tooltip';
import FoiaReportFormCheckboxWidget from './foia_report_form_checkbox_widget';
import { reportActions } from '../actions/quarterly_report';

class QuarterlyReportFormSectionFour extends Component {
  static handleSelectNone(event) {
    reportActions.updateSelectedQuarters([]);
    event.preventDefault();
  }

  constructor(props) {
    super(props);

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelectAll(event) {
    reportActions.updateSelectedQuarters([...this.props.quarters]);
    event.preventDefault();
  }

  handleChange(event) {
    const { target } = event;
    const value = target.value.toString();
    const selected = target.checked
      ? [...this.props.selectedQuarters].concat([value])
      : [...this.props.selectedQuarters].filter((year) => value !== year);
    reportActions.updateSelectedQuarters(selected);
  }

  render() {
    const { quarters, selectedQuarters, quartersDisplayError } = this.props;
    const checkboxFieldsetClasses = ['usa-fieldset-inputs'];
    if (quartersDisplayError) {
      checkboxFieldsetClasses.push('usa-input-error');
    }
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              4. Select Quarters
              <FoiaTooltip text="<p>Select a quarter to view the data for that part of the year. You may select multiple quarters, or you may view all quarters of available data.</p>" />
            </legend>
            <fieldset className={checkboxFieldsetClasses.join(' ')}>
              <legend className="usa-sr-only">Select Quarters</legend>
              <ul className="usa-unstyled-list usa-grid checkbox-list">
                { quarters.map((quarter) => (
                  <li className="usa-width-one-sixth" key={quarter}>
                    <FoiaReportFormCheckboxWidget
                      value={quarter}
                      checked={selectedQuarters.includes(quarter)}
                      onChange={this.handleChange}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
            {quartersDisplayError
              && <p className="usa-input-error-message">At least one Quarter is required.</p>}
            <div className="form-group_footer-links">
              <ul className="inline-list--centered">
                <li><a href="" onClick={this.handleSelectAll} className="touch-safe">Select All</a></li>
                <li><a href="" onClick={QuarterlyReportFormSectionFour.handleSelectNone} className="touch-safe">Select None</a></li>
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

QuarterlyReportFormSectionFour.propTypes = {
  quarters: PropTypes.instanceOf(List),
  selectedQuarters: PropTypes.array,
  quartersDisplayError: PropTypes.bool.isRequired,
};

QuarterlyReportFormSectionFour.defaultProps = {
  quarters: List(),
  selectedQuarters: [],
};

export default QuarterlyReportFormSectionFour;
