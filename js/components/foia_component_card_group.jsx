import React from 'react';
import PropTypes from 'prop-types';
import Card from './foia_component_card';

/**
 * @param {import('prop-types').InferProps<typeof CardGroup>} props
 */
function CardGroup({ cardContent, alt }) {
  if (cardContent && cardContent.length) {
    return (
      <div className={`foia-component-card-group ${alt ? 'foia-component-card-group--alt' : ''}`}>
        <ul className="foia-component-card-group__list">
          {cardContent.map((card) => {
            card.alt = alt;
            return (
              <li key={card.id}>
                <Card
                  card={card}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}

CardGroup.propTypes = {
  cardContent: PropTypes.array.isRequired,
  alt: PropTypes.bool,
};

export default CardGroup;
