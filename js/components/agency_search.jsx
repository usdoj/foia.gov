import React, { useEffect, useRef, useState } from 'react';
import useAgencyStore from '../stores/agency_store';
import Pager from './foia_component_pager';
import CardGroup from './foia_component_card_group';
import tokenizers from '../util/tokenizers';

// Only load bloodhound in the browser (avoid loading it for tests)
let Bloodhound;
if (typeof window !== 'undefined') {
  Bloodhound = require('typeahead.js/dist/bloodhound'); // eslint-disable-line global-require
}

function AgencySearch() {
  const isIndexed = useRef(false);
  const {
    agencyFinderDataComplete,
    agencyFinderDataProgress,
    datums,
  } = useAgencyStore();

  const [search, setSearch] = useState('');
  const [filteredDatums, setFilteredDatums] = useState(datums);

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

  function index() {
    if (isIndexed.current) {
      return;
    }

    // There is no update, only initialize. We assume that the component is only
    // initialized after all the data is ready. Any updates are not significant
    // enough to warrant an update. We only need title and abbreviation to
    // render which should be available once the agency finder data fetch is
    // complete.
    isIndexed.current = true;

    bloodhound.clear(); // Just in case
    bloodhound.add(datums);
    setFilteredDatums(datums);
  }

  useEffect(() => {
    // Indexing the typeahead is expensive and if we do it in batches, it gets
    // complicated to calculate which agencies are centralized vs
    // decentralized. Wait until we've received all the agency finder data
    // before indexing.
    if (agencyFinderDataComplete) {
      index();
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

  const cards = filteredDatums.map((datum) => ({
    ...datum,
    // TODO this is not a category. Not sure how we get that yet.
    category: datum.agency ? datum.agency.title : '',
    // TODO this is not always correct. See js/components/landing.jsx "agencyChange" method
    url: `/?${new URLSearchParams({ id: datum.id, type: datum.type })}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cards ? cards.slice(indexOfFirstPost, indexOfLastPost) : {};

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(cards.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!agencyFinderDataComplete) {
    return (
      <div className="foia-component-agency-search__loading">
        Loading progress:
        {agencyFinderDataProgress}
        %
      </div>
    );
  }

  return (
    <div className="foia-component-agency-search">
      <div className="foia-component-agency-search__search-field">
        <label htmlFor="agency-search">Search an agency name or keyword</label>
        <input
          type="text"
          id="agency-search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type name or keyword"
        />
      </div>

      {cards.length > 0
        && (
          <p className="foia-component-agency-search__results">
            {cards.length}
            {' '}
            results
          </p>
        )}
      <CardGroup
        cardContent={currentPosts}
      />

      <Pager
        postsPerPage={postsPerPage}
        totalPosts={cards.length}
        paginate={paginate}
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default AgencySearch;
