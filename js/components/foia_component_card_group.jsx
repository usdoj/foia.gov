import React from 'react';
import PropTypes from 'prop-types';
import Card from './foia_component_card';

function CardGroup({ cardContent }) {
  if (cardContent && cardContent.length) {
    return (
      <div className="foia-component-card-group">
        <ul className="foia-component-card-group__list">
          {cardContent.map((card) => (
            <Card
              key={card.id}
              card={card}
            />
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

CardGroup.propTypes = {
  cardContent: PropTypes.array.isRequired,
};

export default CardGroup;
