import React from 'react';
import PropTypes from 'prop-types';

function ColorItem({ color, name }) {
  const style = {
    backgroundColor: color,
  };
  return (
    <div className="storybook-color-swatch">
      <div className="storybook-color-swatch__indicator" style={style} />
      <div className="storybook-color-swatch__meta">
        <div className="storybook-color-swatch__name">{name}</div>
        <div className="storybook-color-swatch__hex">
          {color}
        </div>
      </div>
    </div>
  );
}

ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorItem;
