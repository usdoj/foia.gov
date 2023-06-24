import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Pager from './foia_component_pager';
import CardGroup from './foia_component_card_group';
import tokenizers from '../util/tokenizers';

// Only load bloodhound in the browser (avoid loading it for tests)
let Bloodhound;
if (typeof window !== 'undefined') {
  Bloodhound = require('typeahead.js/dist/bloodhound'); // eslint-disable-line global-require
}

const collator = new Intl.Collator('en');

function buildDatums({ agencies, agencyComponents }) {
  // Keep an index of centralized agencies for quick lookup
  /** @type {Record<string, true>} */
  const centralizedAgencyIndex = {};

  return agencies
    .map((agency) => {
      if (agency.isCentralized()) {
        // Warning: Side-effect
        // Add the agency to the index of centralized agencies
        centralizedAgencyIndex[agency.id] = true;
      }

      // Add a title property for common displayKey
      return { ...agency.toJS(), title: agency.name };
    })
    .toJS()
    // Include decentralized agency components in typeahead
    .concat(
      agencyComponents.toJS().filter(
        (agencyComponent) => !(agencyComponent.agency.id in centralizedAgencyIndex),
      ),
    )
    .sort((a, b) => collator.compare(a.title, b.title));
}

function AgencySearch({
  agencies,
  agencyComponents,
  agencyFinderDataComplete,
  agencyFinderDataProgress,
  getDatumUrl,
}) {
  const [search, setSearch] = useState('');
  const [datums, setDatums] = useState([]);
  const [filteredDatums, setFilteredDatums] = useState([]);

  // Store state without re-rendering.
  const fakeThis = useRef({
    indexed: false,
  }).current;

  // Adapted from AgencyComponentFinder
  const bloodhound = useRef(new Bloodhound({
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
      } if (aName > bName) {
        return 1;
      }
      return 0;
    },
    identify: (datum) => datum.id,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: (datum) => (
      datum.type === 'agency'
        ? (
          // For agencies
          []
            .concat(Bloodhound.tokenizers.nonword(datum.name))
            .concat(Bloodhound.tokenizers.whitespace(datum.abbreviation))
        ) : (
          // For agency components
          []
            .concat(Bloodhound.tokenizers.nonword(datum.title))
            .concat(
              datum.abbreviation
                ? Bloodhound.tokenizers.whitespace(datum.abbreviation)
                : tokenizers.firstLetterOfEachCapitalizedWord(datum.title),
            )
            .concat(Bloodhound.tokenizers.whitespace(datum.agency.name))
            .concat(Bloodhound.tokenizers.whitespace(datum.agency.abbreviation))
        )
    ),
  })).current;

  // Adapted from AgencyComponentFinder
  useEffect(() => {
    // Indexing the typeahead is expensive and if we do it in batches, it gets
    // complicated to calculate which agencies are centralized vs
    // decentralized. Wait until we've received all the agency finder data
    // before indexing.
    if (agencyFinderDataComplete) {
      // Index once
      if (fakeThis.indexed) {
        return;
      }
      fakeThis.indexed = true;

      bloodhound.clear(); // Just in case

      // Unlike in AgencyComponentFinder, we've moved Datum generation to
      // the agency_store.
      const initialDatums = buildDatums({
        agencies: agencies.valueSeq(), // Pull the values, convert to sequence,
        agencyComponents,
      });
      bloodhound.add(initialDatums);
      setDatums(initialDatums);
      setFilteredDatums(initialDatums);
    }
  }, [agencyFinderDataComplete, agencies, agencyComponents]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 18;

  useEffect(() => {
    if (datums.length) {
      if (search) {
        bloodhound.search(search, (filtered) => {
          setFilteredDatums(filtered);
          setCurrentPage(1);
        });
      } else {
        setFilteredDatums(datums);
      }
    }
  }, [datums, search]);

  const cards = filteredDatums.map((datum) => ({
    ...datum,
    agencyName: datum.agency ? datum.agency.name : '',
    url: getDatumUrl(datum),
  }));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCards = cards ? cards.slice(indexOfFirstPost, indexOfLastPost) : [];

  return (
    <>
      <div>
        <label className="usa-sr-only" htmlFor="search-field-big">Search an agency name or keyword</label>
        <input
          type="text"
          id="search-field-big"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type agency name"
        />
      </div>

      {cards.length > 0
        ? (
          <p>
            {cards.length}
            {' '}
            results
          </p>
        ) : (
          <p>
            Loading...
            {agencyFinderDataProgress}
            %
          </p>
        )}
      <CardGroup cardContent={currentCards} />

      <Pager
        postsPerPage={postsPerPage}
        totalPosts={cards.length}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

AgencySearch.propTypes = {
  agencies: PropTypes.object.isRequired,
  agencyComponents: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  agencyFinderDataProgress: PropTypes.number.isRequired,
  getDatumUrl: PropTypes.func.isRequired,
};

export default AgencySearch;
