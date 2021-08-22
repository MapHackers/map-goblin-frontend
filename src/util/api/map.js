import Api from '../Api';

export const getMapDataAPI = (mapId) => {
  return Api.get(`/mapdata/${mapId}`);
};

export const createMapDataAPI = (body) => {
  return Api.post('/mapdata', body);
};

export const deleteMapDataAPI = (body) => {
  return Api.post(`/mapdata/delete`, body);
};

export const updateMapDataAPI = (body) => {
  return Api.post(`/mapdata/update`, body);
};

export const registerReview = (body) => {
  return Api.post(`/review`, body);
};
