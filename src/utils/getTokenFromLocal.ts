export const getAccessToken = (): string => {
  const tokenStorage =
    localStorage.getItem('token') ?? sessionStorage.getItem('token');
  if (!tokenStorage) return '';

  const accessToken = JSON.parse(tokenStorage).access_token;
  if (!accessToken) return '';

  return accessToken;
};

export const getRefreshToken = (): string => {
  const tokenStorage =
    localStorage.getItem('token') ?? sessionStorage.getItem('token');
  if (!tokenStorage) return '';

  const refreshToken = JSON.parse(tokenStorage).refresh_token;
  if (!refreshToken) return '';

  return refreshToken;
};
