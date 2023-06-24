import React from 'react';
import PropTypes from 'prop-types';

function Card({ card }) {
  const { agencyName, title, url } = card;

  return (
    <div className="foia-component-card">
      <a href={url}>
        <span className="foia-component-card__category">{agencyName}</span>
        <h2 className="foia-component-card__title">{title}</h2>
      </a>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    agencyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
