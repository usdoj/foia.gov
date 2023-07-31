import React from 'react';
import PropTypes from 'prop-types';
import { useUrlParams } from '../util/use_url';
import { useWait } from '../util/wizard_helpers';
import AgencySearch from './agency_search';
import AgencyDisplay from './agency_display';

/**
 * Show either the agency search or display an agency.
 */
function AgencySwitch(props) {
  const params = useUrlParams();
  const { agencyFinderDataComplete, agencyFinderDataProgress } = props;

  // Don't show loader until a second has passed
  const { hasWaited } = useWait(1000);

  if (!agencyFinderDataComplete) {
    return (
      <div className="foia-component-agency-search__loading">
        {hasWaited && (
          <>
            Loading progress:
            {' '}
            {agencyFinderDataProgress}
            %
          </>
        )}
      </div>
    );
  }

  const id = params.get('id');
  const type = params.get('type');
  if (id && type) {
    return (
      <AgencyDisplay {...props} id={id} type={type} />
    );
  }

  return (
    <AgencySearch {...props} />
  );
}

AgencySwitch.propTypes = {
  agencies: PropTypes.object.isRequired,
  agencyComponents: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number.isRequired,
  flatList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AgencySwitch;
