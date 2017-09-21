import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'typeahead.js/dist/typeahead.jquery';
import Bloodhound from 'typeahead.js/dist/bloodhound';
import $ from 'jquery';


class AgencyComponentSelector extends Component {
  componentDidMount() {
    this.bloodhound = new Bloodhound({
      local: Object.values(this.props.agencies),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: agency =>
        []
          .concat(Bloodhound.tokenizers.nonword(agency.name))
          .concat(Bloodhound.tokenizers.whitespace(agency.id))
          .concat(Bloodhound.tokenizers.whitespace(agency.agency))
          .concat(Bloodhound.tokenizers.whitespace(agency.agency_name)),
    });

    if (!this.typeaheadInput) {
      return;
    }

    this.typeahead = $(this.typeaheadInput).typeahead({
      highlight: true,
    }, {
      name: 'agencies',
      displayKey: 'name',
      source: this.bloodhound.ttAdapter(),
    })
      .bind('typeahead:select', (e, suggestion) => this.props.onAgencyChange(suggestion));
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
  agencies: PropTypes.object,
  onAgencyChange: PropTypes.func.isRequired,
};

AgencyComponentSelector.defaultProps = {
  agencies: [],
  selectedAgency: null,
};

export default AgencyComponentSelector;
