import React from 'react';
import PropTypes from 'prop-types';

function Pager({ postsPerPage, totalPages, paginate }) {
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
            onClick={() => paginate(number)}
            className="page-number"
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pager.propTypes = {
  children: PropTypes.string,
};

export default Pager;
