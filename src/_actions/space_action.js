import {
    SPACE_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_SPACE_INFO,
    ADD_SELECTED_CATEGORY,
    MODIFY_SPACE_INFO,
    MODIFY_FILE,
    SELECT_ISSUE_LIST,
    SELECT_REQUEST_LIST,
    COMPARE_SPACE,
    CREATE_REQUEST,
    SELECT_REQUEST_INFO,
    MERGE_REQUEST_DATA, DENIED_REQUEST_DATA, SELECT_PULL_DATA
} from './type'
import Api from "../util/Api";

export const addFile = (file) => {

    return {
        type: ADD_UPLOAD_FILE,
        payload: file
    }
}

export const modifiedFile = (isModified) => {

    return {
        type: MODIFY_FILE,
        payload: isModified
    }
}

export const fileUpload = (formData) => {
    const request = Api.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }})
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SPACE_FILE_UPLOAD,
        payload: request
    }
}

export const saveSpaceInfo = (values) => {
    const request = Api.post('/spaces', values)
        .then(response=>response)
        .catch(error=>error.response);

    return {
        type: SAVE_SPACE_INFO,
        payload: request
    }
}

export const modifySpaceInfo = (values, userId, spaceName) => {
    const request = Api.post(`/${userId}/spaces/${spaceName}`, values)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: MODIFY_SPACE_INFO,
        payload: request
    }
}

export const addSelectedCategory = (categoryList) => {

    return {
        type: ADD_SELECTED_CATEGORY,
        payload: categoryList
    }
}

export const selectIssueList = (page, userId, spaceName, status) => {
    const request = Api.get(`/${userId}/spaces/${spaceName}/issues?status=${status}&page=${page}`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_ISSUE_LIST,
        payload: request
    }
}

export const selectRequestList = (page, userId, spaceName, status) => {
    const request = Api.get(`/${userId}/spaces/${spaceName}/requests?status=${status}&page=${page}`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_REQUEST_LIST,
        payload: request
    }
}

export const comparespace = (userId, spaceName) => {
    const request = Api.get(`/${userId}/spaces/${spaceName}/compare`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: COMPARE_SPACE,
        payload: request
    }
}

export const createRequest = (url, compareResult) => {
    const request = Api.post(url, compareResult)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: CREATE_REQUEST,
        payload: request
    }
}

export const selectRequestInfo = (url) => {
    const request = Api.get(url)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_REQUEST_INFO,
        payload: request
    }
}

export const saveRequestReply = (url, data) => {
    const request = Api.post(url, data)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_REQUEST_INFO,
        payload: request
    }
}

export const mergeRequestData = (url, data) => {
    const request = Api.post(url, data)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: MERGE_REQUEST_DATA,
        payload: request
    }
}

export const deniedRequestData = (url, data) => {
    const request = Api.post(url, data)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: DENIED_REQUEST_DATA,
        payload: request
    }
}

export const selectCategoryList = (url) => {
    const request = Api.get(url)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: DENIED_REQUEST_DATA,
        payload: request
    }
}

export const selectPullData = (userId, spaceName) => {
    const request = Api.get(`/${userId}/spaces/${spaceName}/pull/compare`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_PULL_DATA,
        payload: request
    }
}