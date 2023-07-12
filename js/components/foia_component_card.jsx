import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('prop-types').InferProps<typeof Card>} props
 */
function Card({ card }) {
  const {
    tag,
    title,
    subtitle,
    url,
    confidenceScore,
    alt,
    onClick,
  } = card;

  return (
    <div className={`foia-component-card ${alt ? 'foia-component-card--alt' : ''}`}>
      <a href={url} onClick={onClick}>
        {tag
          && <span className="foia-component-card__tag">{tag}</span>}
        <h2 className="foia-component-card__title">{title}</h2>
        {subtitle && <span className="foia-component-card__subtitle">{subtitle}</span>}
      </a>
      {confidenceScore && (
        <span className="foia-component-card__score">
          Score:
          {' '}
          {confidenceScore}
        </span>
      )}
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    tag: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    confidenceScore: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
};

export default Card;
