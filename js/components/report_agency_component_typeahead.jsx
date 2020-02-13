import { Map, List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import tokenizers from '../util/tokenizers';
import dispatcher from '../util/dispatcher';
import { reportActions, types } from '../actions/report';


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


class ReportAgencyComponentTypeahead extends Component {
  static display(datum) {
    return datum.agency ? `${datum.title} (${datum.agency.name})` : datum.title;
  }

  constructor(props) {
    super(props);

    this.isIndexed = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      id: uniqueId(),
    });
  }

  componentDidMount() {
    this.bloodhound = new Bloodhound({
      local: [],
      sorter: (a, b) => {
        // Ensure that agencies come before components and vice versa.
        if (a.type === 'agency' && b.type !== 'agency') {
          return -1;
        }
        if (a.type !== 'agency' && b.type === 'agency') {
          return 1;
        }
        // Otherwise sort by title/name.
        const aName = (a.type === 'agency') ? a.name : a.title;
        const bName = (b.type === 'agency') ? b.name : b.title;
        if (aName < bName) {
          return -1;
        } else if (aName > bName) {
          return 1;
        }
        return 0;
      },
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

    const display = this.display;

    this.typeahead = $(this.typeaheadInput).typeahead({
      classNames: {
        wrapper: ['twitter-typeahead', 'usa-search-bg-light', 'usa-reset-width'].join(' '),
        input: ['tt-input', 'usa-reset-width'].join(' '),
      },
      highlight: true,
      hint: false,
    }, {
      name: 'agencies',
      display,
      source: this.bloodhound.ttAdapter(),
      templates: {
        suggestion: datum =>
          $('<div>').addClass(datum.type).text(display(datum)),
      },
    })
      .bind('typeahead:select', (e, suggestion) => this.handleChange(suggestion))
      .bind('typeahead:change', (e, value) => {
        if (value !== this.display(this.props.selectedAgency)) {
          this.setFromValue(value);
        }
      });
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

  setFromValue(value) {
    // Get rid of agency names if the value is an agency component with the name in parens.
    // This matches how the suggestion title would be displayed and converts to
    // a value that could be found by the search. For example, searching for:
    // * Bureau of Economic Analysis (Department of Commerce): Finds no suggestion
    // * Bureau of Economic Analysis: Finds the suggestion
    //    Bureau of Economic Analysis (Department of Commerce)
    const searchVal = value.replace(/\s\(.*\)/gi, '');
    // Find the first suggestion returned from the bloodhound search when the user
    // presses the enter key.  If there is no suggestion, set an error state.
    this.bloodhound.search(searchVal, (suggestions) => {
      if (suggestions.length) {
        // Trigger the selection event on the first suggestion and close the
        // typeahead
        this.typeahead.typeahead('val', this.display(suggestions[0]));
        this.typeahead.trigger('typeahead:select', suggestions[0]);
        this.typeahead.typeahead('close');
      } else {
        // Effectively sets the selectedAgency to an error state.
        this.typeahead.trigger('typeahead:select', {
          error: true,
        });
      }
    });
  }

  handleKeyPress(e) {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    this.setFromValue(this.typeahead.typeahead('val'));
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

  handleChange(selection) {
    // Ensures that the new selection will replace the old selection in the
    // selectedAgencies state.
    Object.assign(selection, {
      index: this.props.selectedAgency.index,
    });

    dispatcher.dispatch({
      type: types.SELECTED_AGENCIES_UPDATE,
      selectedAgency: selection,
      previousAgency: this.props.selectedAgency,
    });

    reportActions.validateAgencyComponentField(selection);
  }

  render() {
    const {
      agencyComponentDisplayError,
    } = this.props;
    const loading = !this.props.agencyFinderDataComplete;
    const wrapperClasses = ['form-group'];
    if (agencyComponentDisplayError) {
      wrapperClasses.push('usa-input-error');
    }

    return (
      <div>
        <div role="search" className={wrapperClasses.join(' ')}>
          <label htmlFor={`agency-component-search-${this.state.id}`}><strong>Agency or Component Name</strong></label>
          <input
            type="text"
            id={`agency-component-search-${this.state.id}`}
            name="agency_component_search"
            placeholder={loading ? `Loading… ${this.props.agencyFinderDataProgress}%` : 'Type agency name'}
            disabled={loading}
            ref={(input) => {
              this.typeaheadInput = input;
            }}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        {agencyComponentDisplayError &&
        <p className="usa-input-error-message">An Agency or Component is required.</p>
        }
      </div>
    );
  }
}

ReportAgencyComponentTypeahead.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  agencies: PropTypes.instanceOf(Map),
  agencyComponents: PropTypes.instanceOf(List),
  /* eslint-enable react/no-unused-prop-types */
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number,
  selectedAgency: PropTypes.object,
  agencyComponentDisplayError: PropTypes.bool.isRequired,
};

ReportAgencyComponentTypeahead.defaultProps = {
  agencies: new Map(),
  agencyComponents: new List(),
  agencyFinderDataProgress: 0,
  selectedAgency: { index: 0 },
};

export default ReportAgencyComponentTypeahead;
