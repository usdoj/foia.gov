import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import tokenizers from '../util/tokenizers';


// Only load typeahead in the browser (avoid loading it for tests)
let Bloodhound;
if (typeof window !== 'undefined') {
  Bloodhound = require('typeahead.js/dist/bloodhound'); // eslint-disable-line global-require
  require('typeahead.js/dist/typeahead.jquery'); // eslint-disable-line global-require
}


// Expects agencies as a sequence type
function datums({ agencies, agencyComponents }) {
  // Keep an index of centralized agencies for quick lookup
  const centralizedAgencyIndex = {};

  return agencies
    .map((agency) => {
      if (agency.isCentralized()) {
        // Warning: Side-effect
        // Add the agency to the index of centralized agencies
        centralizedAgencyIndex[agency.id] = true;
      }

      // Add a title property for common displayKey
      return Object.assign(agency.toJS(), { title: agency.name });
    })
    .toJS()
    // Include decentralized agency components in typeahead
    .concat(
      agencyComponents.toJS().filter(
        agencyComponent => !(agencyComponent.agency.id in centralizedAgencyIndex),
      ),
    );
}


class AgencyComponentFinder extends Component {
  constructor(props) {
    super(props);

    this.isIndexed = false;
  }

  componentDidMount() {
    this.bloodhound = new Bloodhound({
      local: [],
      identify: datum => datum.id,
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

    // If we have all the data already then index it. If we're still waiting on
    // data, we'll index when we receive the complete props.
    if (this.props.agencyFinderDataComplete) {
      this.index(this.props);
    }

    // Initialize the typeahead input element
    if (!this.typeaheadInput) {
      return;
    }

    function display(datum) {
      return datum.agency ? `${datum.title} (${datum.agency.name})` : datum.title;
    }

    this.typeahead = $(this.typeaheadInput).typeahead({
      highlight: true,
    }, {
      name: 'agencies',
      display,
      source: this.bloodhound.ttAdapter(),
      templates: {
        suggestion: datum =>
          $('<div>').addClass(datum.type).text(display(datum)),
      },
    })
      .bind('typeahead:select', (e, suggestion) => this.props.onAgencyChange(suggestion));
  }

  componentWillReceiveProps(nextProps) {
    // Indexing the typeahead is expensive and if we do it in batches, it gets
    // complicated to calculate which agencies are centralized vs
    // decentralized. Wait until we've received all the agency finder data
    // before indexing.
    if (!nextProps.agencyFinderDataComplete) {
      return;
    }

    this.index(nextProps);
  }

  index(props) {
    if (this.isIndexed) {
      return;
    }

    // There is no update, only initialize. We assume that the component is only
    // initialized after all the data is ready. Any updates are not significant
    // enough to warrant an update. We only need title and abbreviation to
    // render which should be available once the agency finder data fetch is
    // complete.
    this.isIndexed = true;
    const { agencies, agencyComponents } = props;

    this.bloodhound.clear(); // Just in case
    this.bloodhound.add(datums({
      agencies: agencies.valueSeq(), // Pull the values, convert to sequence
      agencyComponents,
    }));
  }

  render() {
    const { agencyFinderDataProgress } = this.props;
    const loading = !this.props.agencyFinderDataComplete;
    const onSubmit = (e) => {
      e.preventDefault();
      this.bloodhound.search(this.typeahead.typeahead('val'), (suggestions) => {
        if (suggestions.length) {
          // Trigger the selection event on the first suggestion and close the
          // typeahead
          this.typeahead.trigger('typeahead:select', suggestions[0]);
          this.typeahead.typeahead('close');
        }
      });
    };

    const buttonClasses = ['usa-button', 'usa-sr-hidden'];
    if (loading) {
      buttonClasses.push('usa-button-disabled');
    } else {
      buttonClasses.push('usa-button-primary');
    }

    return (
      <form className="usa-search usa-search-big" onSubmit={onSubmit}>
        <div role="search">
          <label className="usa-sr-only" htmlFor="search-field-big">Search for an agency</label>
          <input
            type="text"
            id="search-field-big"
            name="search"
            placeholder="Type agency name"
            ref={(input) => { this.typeaheadInput = input; }}
          />
          <button
            className={buttonClasses.join(' ')}
            disabled={loading}
            type="submit"
          >
            <span className="usa-search-submit-text">
              { loading ? `Loading… ${agencyFinderDataProgress}%` : 'Search' }
            </span>
          </button>
        </div>
      </form>
    );
  }
}

AgencyComponentFinder.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  /* eslint-enable react/no-unused-prop-types */
  onAgencyChange: PropTypes.func.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
};

AgencyComponentFinder.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
};

export default AgencyComponentFinder;
