import axios from 'axios';
import Api from '../Api';

export const userAuthAPI = (token) => {
  return axios.get('/api/authentication', {
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': `${token}`,
    },
  });
};

export const userLoginAPI = (dataToSubmit) => {
  return axios.post('/api/login', dataToSubmit);
};

export const getUserInfoByUserIdAPI = (userId) => {
  return Api.get(`/members/${userId}`);
};

export const editUserAPI = (body) => {
  return Api.post(`/members/profile`, body);
};
