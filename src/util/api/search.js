import Api from '../Api';

export const searchRepositoryAPI = (keyword) => {
  return Api.get(`/search/repositories/${keyword}`);
};

export const searchUserAPI = (keyword) => {
  return Api.get(`/search/members/${keyword}`);
};
