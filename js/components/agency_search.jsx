import React from 'react';
import PropTypes from 'prop-types';
// import Pager from './foia_component_pager';
import CardGroup from './foia_component_card_group';

function AgencySearch({ agencies }) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(18);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = agencies ? agencies.slice(indexOfFirstPost, indexOfLastPost) : {};

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const cards = agencies.map((agency) => ({
    category: agency.title,
    title: agency.agency.name,
  }));

  return (
    <>
      {/* <div>
        <label className="usa-sr-only" htmlFor="search-field-big">Search an agency name or keyword</label>
        <input
          type="text"
          id="search-field-big"
          name="search"
          placeholder="Type agency name"
        />
      </div> */}

      {cards
        && (
          <p>
            {cards.length}
            {' '}
            results
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

AgencySearch.propTypes = {
  agencies: PropTypes.object,
};

export default AgencySearch;
