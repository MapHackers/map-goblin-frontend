import Api from '../Api';

export const getAllRepositoryAPI = () => {
  return Api.get('/repositories');
};

export const createRepositoryAPI = (body) => {
  return Api.post('/repositories', body);
};

export const getRepositoryByCategoryNameAPI = (categoryName) => {
  return Api.get(`/${categoryName}/repositories/category`);
};

export const getLikedRepositoryByUserIdAPI = (userId) => {
  return Api.get(`/${userId}/repositories/likes`);
};

export const sendVisitCountToServerAPI = (userId, repositoryName) => {
  return Api.post(`/${userId}/${repositoryName}/visit`);
};

export const getRepositoryInfo = (userId, repositoryName) => {
  return Api.get(`/${userId}/repositories/${repositoryName}`);
};

export const cloneRepository = (repositoryId) => {
  return Api.post('/repositories/clone', { repositoryId: repositoryId });
};

export const likeRepository = (repositoryId, type) => {
  return Api.post(`/${repositoryId}/like`, { type: type });
};

export const getCategoryOptionsAPI = () => {
  return Api.get(`/categories`);
};

export const getIssueListAPI = (page, userId, repositoryName, status) => {
  return Api.get(`/${userId}/repositories/${repositoryName}/issues?status=${status}&page=${page}`);
};

export const getRequestListAPI = (page, userId, repositoryName, status) => {
  return Api.get(
    `/${userId}/repositories/${repositoryName}/requests?status=${status}&page=${page}`
  );
};

export const compareRepositoryAPI = (userId, repositoryName) => {
  return Api.get(`/${userId}/repositories/${repositoryName}/compare`);
};

export const selectPullDataAPI = (userId, repositoryName) => {
  return Api.get(`/${userId}/repositories/${repositoryName}/pull/compare`);
};

export const modifyRepositoryAPI = (values, userId, repositoryName) => {
  return Api.post(`/${userId}/repositories/${repositoryName}`, values);
};

export const deleteRepositoryAPI = (repositoryId) => {
  return Api.post(`/repositories/${repositoryId}/delete`);
};

export const repositoryVisitCount = (userId, repositoryName) => {
  return Api.post(`/${userId}/${repositoryName}/visit`);
};

export const deniedRequestDataAPI = (url, data) => {
  return Api.post(url, data);
};

export const mergeRequestDataAPI = (url, data) => {
  return Api.post(url, data);
};

export const saveRequestReplyAPI = (url, data) => {
  return Api.post(url, data);
};

export const selectRequestInfoAPI = (url) => {
  return Api.get(url);
};
