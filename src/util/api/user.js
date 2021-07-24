import axios from 'axios';

export const userAuthAPI = (token) => {
  return axios.get('/api/authentication', {
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': `${token}`,
    },
  });
};

export const userLoginAPI = (dataToSubmit) => {
  return axios.post('/api/login', dataToSubmit)
}