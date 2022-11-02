const getIsRemember = (): boolean => {
  const loginStorage = localStorage.getItem('persist:login');

  return loginStorage
    ? JSON.parse(JSON.parse(loginStorage)?.login)?.isRemember
    : false;
};

export default getIsRemember;
