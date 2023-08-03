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
    // Rewrite links: if origin doesn't match current, add target.
    const newHtml = html.replace(/<a ([^>]+)>(.+?)<\/a>/sg, (m0, attrs, inner) => {
      const [, href] = attrs.match(/\bhref="([^"]+)"/) || [];
      if (!href) {
        return m0;
      }

      const hrefOrigin = href.split('/').slice(0, 3).join('/');
      if (hrefOrigin !== location.origin) {
        return `<a ${attrs} target="_blank">${inner}</a>`;
      }

      return m0;
    })
      // Rewrite links: Make www.foia.gov links root-relative, so they work on dev sites.
      .replace(/https:\/\/www\.foia\.gov\//g, '/');

    return (
      <div
        className="w-component-rich-text"
        data-mid={mid}
        title={title || undefined}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: newHtml }}
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
