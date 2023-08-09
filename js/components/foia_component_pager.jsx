import React from 'react';
import PropTypes from 'prop-types';

function Pager({
  postsPerPage,
  totalPosts,
  setPage,
  currentPage,
  showPrevious,
  showNext,
}) {
  const pageNumbers = [];

  let activePageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  let elipsesPrev;
  let elipsesNext;

  if (pageNumbers.length > 5) {
    if (currentPage <= 3) {
      activePageNumbers = [1, 2, 3, 4];
    }

    if (currentPage > 3) {
      activePageNumbers = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ];
      elipsesPrev = true;
    }

    if (currentPage < (pageNumbers.length - 2)) {
      elipsesNext = true;
    }

    if (currentPage > (pageNumbers.length - 3)) {
      activePageNumbers = [
        pageNumbers.length - 3,
        pageNumbers.length - 2,
        pageNumbers.length - 1,
        pageNumbers.length,
      ];
    }
  } else {
    activePageNumbers = pageNumbers;
  }

  return (
    <div className="foia-component-pager">
      <ul className="foia-component-pager__list">
        <li className="foia-component-pager__page-number foia-component-pager__page-number--previous">
          <a
            className="foia-component-pager__page-number-link"
            onClick={(event) => {
              event.preventDefault();
              showPrevious();
            }}
            href=""
            rel="prev"
          >
            prev
          </a>
        </li>
        {elipsesPrev
          && (
            <>
              <li
                key={1}
                className={`foia-component-pager__page-number ${currentPage === 1 ? 'foia-component-pager__page-number--current' : ''}`}
              >
                <a
                  className="foia-component-pager__page-number-link"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(1);
                  }}
                  href=""
                >
                  <span className="visually-hidden">
                    page
                  </span>
                  {1}
                </a>
              </li>
              <li className="foia-component-pager__elipses">
                ...
              </li>
            </>
          )}
        {activePageNumbers.map((number) => (
          <li
            key={number}
            className={`foia-component-pager__page-number ${currentPage === number ? 'foia-component-pager__page-number--current' : ''}`}
          >
            <a
              className="foia-component-pager__page-number-link"
              onClick={(event) => {
                event.preventDefault();
                setPage(number);
              }}
              href=""
            >
              <span className="visually-hidden">
                page
              </span>
              {number}
            </a>
          </li>
        ))}
        {elipsesNext
          && (
            <>
              <li className="foia-component-pager__elipses">
                ...
              </li>
              <li
                key={pageNumbers.length}
                className={`foia-component-pager__page-number ${currentPage === pageNumbers.length ? 'foia-component-pager__page-number--current' : ''}`}
              >
                <a
                  className="foia-component-pager__page-number-link"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(pageNumbers.length);
                  }}
                  href=""
                >
                  <span className="visually-hidden">
                    page
                  </span>
                  {pageNumbers.length}
                </a>
              </li>
            </>
          )}
        <li className="foia-component-pager__page-number foia-component-pager__page-number--next">
          <a
            className="foia-component-pager__page-number-link"
            onClick={(event) => {
              event.preventDefault();
              showNext();
            }}
            href=""
            rel="next"
          >
            next
          </a>
        </li>
      </ul>
    </div>
  );
}

Pager.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  setPage: PropTypes.func,
  currentPage: PropTypes.number,
  showPrevious: PropTypes.func,
  showNext: PropTypes.func,
};

export default Pager;
