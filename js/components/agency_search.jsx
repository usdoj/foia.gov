/**
 * Load /agency-search.html?-export=1 to download agencies JSON.
 */

import React, {
  useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import Pager from './foia_component_pager';
import CardGroup from './foia_component_card_group';
import tokenizers from '../util/tokenizers';
import { urlParams } from '../util/wizard_helpers';
import agencyComponentStore from '../stores/agency_component';
import { pushUrl } from '../util/use_url';
import { titlePrefix } from '../util/dom';

// Only load bloodhound in the browser (avoid loading it for tests)
let Bloodhound;
if (typeof window !== 'undefined') {
  Bloodhound = require('typeahead.js/dist/bloodhound'); // eslint-disable-line global-require
}

function AgencySearch({
  agencies,
  agencyComponents,
  agencyFinderDataComplete,
  flatList,
}) {
  useEffect(() => {
    document.title = `${titlePrefix}Identify an agency to request from`;
  }, []);

  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(/** @type FlatListItem[] */ flatList);

  const isExport = urlParams().get('-export');
  const exportRef = useRef(null);

  // Store state without re-rendering.
  const fakeThis = useRef({
    indexed: false,
  }).current;

  // Adapted from AgencyComponentFinder
  const bloodhound = useRef(new Bloodhound({
    local: [],
    identify: (item) => item.id,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: (item) => (
      item.type === 'agency'
        ? (
          // For agencies
          []
            .concat(Bloodhound.tokenizers.nonword(item.name))
            .concat(Bloodhound.tokenizers.whitespace(item.abbreviation))
        ) : (
          // For agency components
          []
            .concat(Bloodhound.tokenizers.nonword(item.title))
            .concat(
              item.abbreviation
                ? Bloodhound.tokenizers.whitespace(item.abbreviation)
                : tokenizers.firstLetterOfEachCapitalizedWord(item.title),
            )
            .concat(Bloodhound.tokenizers.whitespace(item.agency.name))
            .concat(Bloodhound.tokenizers.whitespace(item.agency.abbreviation))
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
      bloodhound.add(flatList);
    }
  }, [agencyFinderDataComplete, agencies, agencyComponents]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 18;

  useEffect(() => {
    // Scroll to top whenever page changes
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      // NOOP
    }
  }, [currentPage]);

  useEffect(() => {
    if (flatList.length) {
      if (search) {
        bloodhound.search(search, (filtered) => {
          setFilteredList(filtered);
          setCurrentPage(1);
        });
      } else {
        setFilteredList(flatList);
      }
    }
  }, [flatList, search]);

  const cards = filteredList.map((flatItem) => {
    const url = agencyComponentStore.getFlatItemUrl(flatItem);
    return {
      ...flatItem,
      tag: flatItem.agency ? flatItem.agency.name : '',
      url,
      onClick(e) {
        // Push URL so we don't have to reload the page.
        e.preventDefault();
        pushUrl(url);
      },
    };
  });

  useEffect(() => {
    let objectUrl;

    // Allow exporting flat item list
    if (isExport && cards.length && exportRef.current) {
      const json = JSON.stringify(cards.map((card) => {
        const {
          abbreviation, id, name, type,
        } = card.agency || {};
        return {
          abbreviation: card.abbreviation,
          parent: card.agency ? {
            abbreviation, id, name, type,
          } : null,
          id: card.id,
          title: card.title,
          type: card.type,
          url: card.url,
        };
      }), null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      objectUrl = window.URL.createObjectURL(blob);
      exportRef.current.href = objectUrl;
    }

    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [cards, exportRef.current]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards ? cards.slice(indexOfFirstCard, indexOfLastCard) : {};

  function setPageAndScrollUp(page) {
    setCurrentPage(page);
    const el = $('#agency-search-react-app')[0];
    if (el) {
      el.scrollIntoView();
    }
  }

  const showPrevious = () => {
    if (currentPage !== 1) {
      setPageAndScrollUp(currentPage - 1);
    }
  };

  const showNext = () => {
    if (currentPage !== Math.ceil(cards.length / cardsPerPage)) {
      setPageAndScrollUp(currentPage + 1);
    }
  };

  if (isExport) {
    return (
      <p>
        Download
        {' '}
        <a ref={exportRef} download="agencies.json"><code>agencies.json</code></a>
      </p>
    );
  }

  return (
    <div className="foia-component-agency-search">
      <h1>Identify an agency to request from</h1>
      <p>
        It’s important that you identify the correct agency for your request. There
        are over 100 agencies and each is responsible for handling its own FOIA
        requests. You can find a breakdown of agencies by topic on
        {' '}
        <a href="//www.usa.gov">USA.gov</a>
        {' '}
        to help
        you identify the correct agency. You may also search for agencies using
        the search bar below.
      </p>
      <p>
        When choosing an agency, remember that some agencies can’t yet receive FOIA
        requests through FOIA.gov. For those agencies, this site will provide you
        with the information you need to submit a request directly to the agency.
      </p>

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
        cardContent={currentCards}
      />

      <Pager
        postsPerPage={cardsPerPage}
        totalPosts={cards.length}
        setPage={setPageAndScrollUp}
        currentPage={currentPage}
        showPrevious={showPrevious}
        showNext={showNext}
      />
    </div>
  );
}

AgencySearch.propTypes = {
  agencies: PropTypes.object.isRequired,
  agencyComponents: PropTypes.object.isRequired,
  agencyFinderDataComplete: PropTypes.bool.isRequired,
  flatList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AgencySearch;
