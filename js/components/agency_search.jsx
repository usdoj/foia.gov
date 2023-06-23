import React, { useEffect, useRef, useState } from 'react';
import useAgencyStore from '../stores/agency_store';
// import Pager from './foia_component_pager';
import CardGroup from './foia_component_card_group';
import tokenizers from '../util/tokenizers';

// Only load bloodhound in the browser (avoid loading it for tests)
let Bloodhound;
if (typeof window !== 'undefined') {
  Bloodhound = require('typeahead.js/dist/bloodhound'); // eslint-disable-line global-require
}

function AgencySearch() {
  const {
    agencyFinderDataComplete,
    agencyFinderDataProgress,
    datums,
    getDatumUrl,
  } = useAgencyStore();

  const [search, setSearch] = useState('');
  const [filteredDatums, setFilteredDatums] = useState(datums);

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
      bloodhound.clear(); // Just in case

      // Unlike in AgencyComponentFinder, we've moved Datum generation to
      // the agency_store.
      bloodhound.add(datums);

      setFilteredDatums(datums);
    }
  }, [agencyFinderDataComplete]);

  useEffect(() => {
    if (datums.length) {
      if (search) {
        bloodhound.search(search, setFilteredDatums);
      } else {
        setFilteredDatums(datums);
      }
    }
  }, [datums, search]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(18);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = agencies ? agencies.slice(indexOfFirstPost, indexOfLastPost) : {};

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const cards = filteredDatums.map((datum) => ({
    ...datum,
    // TODO this is not a category. Not sure how we get that yet.
    category: datum.agency ? datum.agency.title : '',
    url: getDatumUrl(datum),
  }));

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
      <CardGroup
        cardContent={cards}
      />

      {/* <Pager
        postsPerPage={postsPerPage}
        totalPosts={agencies.length}
        paginate={paginate}
      /> */}
    </>
  );
}

export default AgencySearch;
