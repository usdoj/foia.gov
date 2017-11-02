/*
 * domify
 *
 * Converts text to react elements. **Only use for known-safe content.**
 */
import React from 'react';

function domify(content) {
  /* eslint-disable react/no-danger */
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
  /* eslint-enable react/no-danger */
}

export default domify;
