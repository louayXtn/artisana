

import Cookies from 'js-cookie';

const fetchWithAuth = async (url, options = {}) => {
  let token = Cookies.get('accessToken');
  const refreshUrl = () =>
  import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL.replace(/\/$/, '')}/auth/refresh`
    : '/auth/refresh';

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined
    },
    credentials: 'include'
  });

  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch(refreshUrl(), { method: 'GET', credentials: 'include' });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      Cookies.set('accessToken', data.accessToken);
      token = data.accessToken;

      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
    } else {
      throw new Error('فشل في تجديد التوكن');
    }
  }

  return res;
};

export default fetchWithAuth;