import apiRequest from 'src/api/apiRequest';

export const checkUsernameExist = async (username: string) => {
  try {
    const res = await apiRequest.post('api/users/check-username-exists', {
      username,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const res = await apiRequest.post('api/users/check-email-exists', {
      email,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
