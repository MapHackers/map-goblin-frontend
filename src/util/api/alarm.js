import Api from '../Api';

export const loadAlarmAPI = (userId) => {
  return Api.get(`/${userId}/alarms`);
};

export const onClickAlarmAPI = (key) => {
  return Api.post('/alarms', { alarmId: key });
};
