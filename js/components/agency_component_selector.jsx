import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'typeahead.js/dist/typeahead.jquery';
import Bloodhound from 'typeahead.js/dist/bloodhound';
import $ from 'jquery';

import tokenizers from '../util/tokenizers';


function datums(props) {
  const { agencies, agencyComponents } = props;
  return Object.values(agencies)
    // Add a title property for common displayKey
    .map(agency => Object.assign({}, agency, { title: agency.name }))
    // Include agency components in typeahead
    .concat(agencyComponents);
}


class AgencyComponentSelector extends Component {
  componentDidMount() {
    this.bloodhound = new Bloodhound({
      local: datums(this.props),
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
              .concat(
                datum.abbreviation ?
                  Bloodhound.tokenizers.whitespace(datum.abbreviation) :
                  tokenizers.firstLetterOfEachCapitalizedWord(datum.title),
              )
              .concat(Bloodhound.tokenizers.whitespace(datum.agency.name))
              .concat(Bloodhound.tokenizers.whitespace(datum.agency.abbreviation))
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
    // TODO check nextProps against current props first
    this.bloodhound.clear();
    this.bloodhound.add(datums(nextProps));
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
  agencies: PropTypes.object,
  agencyComponents: PropTypes.arrayOf(PropTypes.object),
  /* eslint-enable react/no-unused-prop-types */
  onAgencyChange: PropTypes.func.isRequired,
};

AgencyComponentSelector.defaultProps = {
  agencies: {},
  agencyComponents: [],
  selectedAgency: null,
};

export default AgencyComponentSelector;
