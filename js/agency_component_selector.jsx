import React from 'react';
import PropTypes from 'prop-types';

function AgencyComponentSelector(props) {
  const { agencies, selectedAgency } = props;

  function onChange() {
    console.log('select changed');
  }

  const options = Object.entries(agencies)
    .map(([agency, name]) => <option key={agency} value={agency}>{ name }</option>);

  // Allow unset
  options.unshift(<option key="0" value="">Please select an agency</option>);

  return (
    <form>
      <select selected={selectedAgency} onChange={onChange}>
        { options }
      </select>
    </form>
  );
}

AgencyComponentSelector.propTypes = {
  agencies: PropTypes.object,
  selectedAgency: PropTypes.string,
};

AgencyComponentSelector.defaultProps = {
  agencies: [],
  selectedAgency: null,
};

export default AgencyComponentSelector;
