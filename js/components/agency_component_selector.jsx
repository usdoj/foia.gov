import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'typeahead.js/dist/typeahead.jquery';
import Bloodhound from 'typeahead.js/dist/bloodhound';
import $ from 'jquery';


// Expects agencies as a sequence type
function datums({ agencies, agencyComponents }) {
  return agencies.toJS()
    // Add a title property for common displayKey
    .map(agency => Object.assign({}, agency, { title: agency.name }))
    // Include agency components in typeahead
    .concat(agencyComponents.toJS());
}


class AgencyComponentSelector extends Component {
  componentDidMount() {
    const { agencies, agencyComponents } = this.props;
    this.bloodhound = new Bloodhound({
      local: datums({
        agencies: agencies.valueSeq(), // Pull the values, convert to sequence
        agencyComponents,
      }),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: datum => (
        datum.type === 'agency' ?
          (
            // For agencies
            []
              .concat(Bloodhound.tokenizers.nonword(datum.name))
              .concat(Bloodhound.tokenizers.whitespace(datum.abbreviation))
          ) : (
            // For agency components
            []
              .concat(Bloodhound.tokenizers.nonword(datum.title))
              .concat(Bloodhound.tokenizers.whitespace(datum.abbreviation))
              .concat(Bloodhound.tokenizers.whitespace(datum.agency.name))
          )
      ),
    });

    if (!this.typeaheadInput) {
      return;
    }

    this.typeahead = $(this.typeaheadInput).typeahead({
      highlight: true,
    }, {
      name: 'agencies',
      display: (datum => (datum.agency ? `${datum.title} (${datum.agency.name})` : datum.title)),
      source: this.bloodhound.ttAdapter(),
    })
      .bind('typeahead:select', (e, suggestion) => this.props.onAgencyChange(suggestion));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.agencies.equals(nextProps.agencies)
        && this.props.agencyComponents.equals(nextProps.agencyComponents)) {
      return;
    }

    const differenceAgencies = nextProps.agencies.toSet().subtract(this.props.agencies.toSet());
    const differenceAgencyComponents =
      nextProps.agencyComponents.toSet().subtract(this.props.agencyComponents.toSet());

    this.bloodhound.add(datums({
      agencies: differenceAgencies,
      agencyComponents: differenceAgencyComponents,
    }));
  }

  render() {
    return (
      <form>
        <input type="text" ref={(input) => { this.typeaheadInput = input; }} />
      </form>
    );
  }
}

AgencyComponentSelector.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  /* eslint-enable react/no-unused-prop-types */
  onAgencyChange: PropTypes.func.isRequired,
};

AgencyComponentSelector.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
};

export default AgencyComponentSelector;
