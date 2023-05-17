import React from 'react';
import ColorItem from './ColorItem';
import { objectForEach, objectMap } from '../../../../util/object';
import { COLORS } from '../../../00-config/_theme-settings.es6';

function Color() {
  return (
    <>
      <div className="storybook-color">
        <h4>Brand</h4>
        {objectMap(COLORS.brand, (key, list) => {
          const base = {};
          const light = {};
          const dark = {};
          const other = {};

          return (
            <div className="storybook-color__group">
              {objectForEach(list, (color_key, color) => {
                if (color_key.startsWith('light')) {
                  light[color_key] = color;
                } else if (color_key.startsWith('dark')) {
                  dark[color_key] = color;
                } else if (color_key.startsWith('base')) {
                  base[color_key] = color;
                } else {
                  other[color_key] = color;
                }
              })}

              {Object.keys(base).length > 0
                && objectMap(base, (base_key, base_value) => (
                  <ColorItem color={base_value} name={`${key}-${base_key}`} />
                ))}

              {Object.keys(light).length > 0
                && objectMap(light, (light_key, light_value) => (
                  <ColorItem color={light_value} name={`${key}-${light_key}`} />
                ))}

              {Object.keys(dark).length > 0
                && objectMap(dark, (dark_key, dark_value) => (
                  <ColorItem color={dark_value} name={`${key}-${dark_key}`} />
                ))}

              {Object.keys(other).length > 0
                && objectMap(other, (other_key, other_value) => (
                  <ColorItem color={other_value} name={`${key}-${other_key}`} />
                ))}
            </div>
          );
        })}
      </div>

      <div className="storybook-color">
        <h4>Grayscale</h4>
        <div className="storybook-color__group">
          {objectMap(COLORS.grayscale, (name, color) => (
            <ColorItem color={color} name={name} />
          ))}
        </div>
      </div>

      <div className="storybook-color">
        <h4>Other</h4>
        {objectMap(COLORS.other, (key, list) => (
          <div className="storybook-color__group">
            {objectMap(list, (name, color) => (
              <ColorItem color={color} name={`${key}-${name}`} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Color;
