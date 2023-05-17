import React from 'react';
import { TYPOGRAPHY } from '../../../00-config/_theme-settings.es6';
import { objectMap } from '../../../../util/object';

function Fonts() {
  return (
    <>
      {objectMap(TYPOGRAPHY['font-family'], (name, item) => {
        const stack = item.stack;
        const fontFamily = { fontFamily: stack };

        return (
          <div className="storybook-font">
            <h3 className="storybook-font__family" style={fontFamily}>{item.name}</h3>
            {objectMap(TYPOGRAPHY['font-weight'], (key, weight) => {
              const fontWeight = { fontWeight: weight };
              const previewStyle = { fontStyle: 'normal', ...fontWeight, ...fontFamily };

              return (
                <div className="storybook-font__item">
                  <div className="storybook-font__preview-character" style={previewStyle}>AaBbCc</div>
                  <div className="storybook-font__preview" style={previewStyle}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    <br />
                    abcdefghijklmnopqrstuvwxyz
                    <br />
                    1234567890(,.;:?!$&*)
                  </div>
                  <div className="storybook-font__preview-meta">
                    <div className="storybook-font__name">{item.name}</div>
                    <div className="storybook-font__weight">
                      <span className="storybook-font__label">Weight:</span>
                      {weight}
                    </div>
                    <div className="storybook-font__style">
                      <span className="storybook-font__label">Style:</span>
                      {stack}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default Fonts;
