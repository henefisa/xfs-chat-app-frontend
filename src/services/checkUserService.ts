import apiRequest from 'src/api/apiRequest';

export const checkUsernameExist = async (username: string) => {
  try {
    const res = await apiRequest.post('api/auth/checkUsernameExists', {
      username,
    });
    if (res && !res.data) {
      return res.data;
    } else {
      return 'Error';
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const res = await apiRequest.post('api/auth/checkEmailExists', {
      email,
    });
    if (res && !res.data) {
      return res.data;
    } else {
      return 'Error';
    }
  } catch (err) {
    console.log(err);
  }
};
