import { useEffect, useState } from 'react';

/**
 * Hook that updates on URL changes (as long as they occur using
 * the back button or the "useUrl" event is fired on window.)
 *
 * @see pushUrl
 */
export function useUrl() {
  const initUrl = typeof window === 'undefined' ? 'http://example.com/' : window.location.href;
  const [url, setUrl] = useState(initUrl);

  useEffect(() => {
    const listener = () => {
      setUrl(window.location.href);
    };
    window.addEventListener('popstate', listener);
    window.addEventListener('useUrl', listener);

    return () => {
      window.removeEventListener('popstate', listener);
      window.removeEventListener('useUrl', listener);
    };
  }, []);

  return url;
}

/**
 * Push a URL, scroll to the top, and notify the useUrl() hook.
 *
 * @param {string} url
 * @see useUrl
 */
export function pushUrl(url) {
  history.pushState(null, null, url);
  window.scrollTo({ top: 0 });
  window.dispatchEvent(new Event('useUrl'));
}

/**
 * Return a URLSearchParams made from location.search (updates via
 * useUrl)
 *
 * @see useUrl
 */
export function useUrlParams() {
  const url = useUrl();
  const noFragment = url.split('#')[0];
  const search = noFragment.split('?')[1] || '';
  return new URLSearchParams(search);
}
