import React from 'react';
import PropTypes from 'prop-types';

function Pager({ postsPerPage, totalPosts, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="foia-component-pager">
      <ul className="foia-component-pager__list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-number"
          >
            <button type="button" onClick={() => setCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Pager.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pager;
