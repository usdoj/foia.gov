import React from 'react';
import PropTypes from 'prop-types';

function Card({ category, title }) {
  return (
    <div className="foia-component-card">
      <span className="foia-component-card__category">{category}</span>
      <h2 className="foia-component-card__title">{title}</h2>
    </div>
  );
}

Card.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
