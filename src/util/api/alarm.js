import Api from "../Api"

export const loadAlarmAPI = (userId) => {
    return Api.get(`/${userId}/alarms`)
}