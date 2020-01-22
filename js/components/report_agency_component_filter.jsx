import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReportAgencyComponentTypeahead from './report_agency_component_typeahead';


class ReportAgencyComponentFilter extends Component {
  render() {
    const {
      agencies,
      agencyComponents,
      agencyFinderDataProgress,
      agencyFinderDataComplete,
      onAgencyChange,
    } = this.props;

    return (
      <div className="usa-search usa-search-big">
        <ReportAgencyComponentTypeahead
          agencies={agencies}
          agencyComponents={agencyComponents}
          agencyFinderDataProgress={agencyFinderDataProgress}
          agencyFinderDataComplete={agencyFinderDataComplete}
          onAgencyChange={onAgencyChange}
        />
      </div>
    );
  }
}

ReportAgencyComponentFilter.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  /* eslint-enable react/no-unused-prop-types */
  onAgencyChange: PropTypes.func.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
};

ReportAgencyComponentFilter.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
};

export default ReportAgencyComponentFilter;
