import React from 'react';
import PropTypes from 'prop-types';
import { urlParams } from '../util/wizard_helpers';

const isDebug = Boolean(urlParams().get('debug'));

/**
 * @param {Object} props
 * @param {import('react').ReactNode=} props.children
 * @param {string=} props.html
 * @param {string=} props.mid
 * @return {React.ElementType}
 */
function RichText({ children = '', html = '', mid }) {
  let title = '';
  if (isDebug && mid) {
    // Debug server-sent messages
    if (mid === 'intro_slide' || mid === 'query_slide') {
      title = mid;
    } else if (/^m\d+$/.test(mid)) {
      title = `Message ${mid.substring(1)}`;
    }
  }

  if (html) {
    return (
      <div
        className="w-component-rich-text"
        data-mid={mid}
        title={title || undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className="w-component-rich-text"
      data-mid={mid}
      title={title || undefined}
    >
      {children}
    </div>
  );
}

RichText.propTypes = {
  children: PropTypes.node,
  html: PropTypes.string,
  mid: PropTypes.string,
};

export default RichText;
