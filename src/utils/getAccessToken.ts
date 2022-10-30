const getAccessTokenFromStorage = () => {
  const loginStorage = localStorage.getItem('persist:login');
  return loginStorage
    ? JSON.parse(JSON.parse(loginStorage)?.login)?.currentAccessToken
    : '';
};

export default getAccessTokenFromStorage;
