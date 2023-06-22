import React from 'react';
import PropTypes from 'prop-types';

function Card({ card }) {
  const {
    title, category, url,
  } = card;

  return (
    <div className="foia-component-card">
      <a href={url}>
        <span className="foia-component-card__category">{category}</span>
        <h2 className="foia-component-card__title">{title}</h2>
      </a>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
