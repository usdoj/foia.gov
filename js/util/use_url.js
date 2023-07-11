import { useEffect, useState } from 'react';

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
 * @param {string} url
 */
export function pushUrl(url) {
  history.pushState(null, null, url);
  window.scrollTo({ top: 0 });
  window.dispatchEvent(new Event('useUrl'));
}

export function useUrlParams() {
  const url = useUrl();
  const noFragment = url.split('#')[0];
  const search = noFragment.split('?')[1] || '';
  return new URLSearchParams(search);
}
