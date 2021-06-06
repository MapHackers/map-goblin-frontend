import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO,
    ADD_SELECTED_CATEGORY,
    MODIFY_REPOSITORY_INFO,
    MODIFY_FILE,
    SELECT_ISSUE_LIST,
    SELECT_REQUEST_LIST,
    COMPARE_REPOSITORY,
    CREATE_REQUEST,
    SELECT_REQUEST_INFO,
    MERGE_REQUEST_DATA, DENIED_REQUEST_DATA
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
        type: REPOSITORY_FILE_UPLOAD,
        payload: request
    }
}

export const saveRepositoryInfo = (values) => {
    const request = Api.post('/repositories', values)
        .then(response=>response)
        .catch(error=>error.response);

    return {
        type: SAVE_REPOSITORY_INFO,
        payload: request
    }
}

export const modifyRepositoryInfo = (values, userId, repositoryName) => {
    const request = Api.post(`/${userId}/repositories/${repositoryName}`, values)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: MODIFY_REPOSITORY_INFO,
        payload: request
    }
}

export const addSelectedCategory = (categoryList) => {

    return {
        type: ADD_SELECTED_CATEGORY,
        payload: categoryList
    }
}

export const selectIssueList = (page, userId, repositoryName, status) => {
    const request = Api.get(`/${userId}/repositories/${repositoryName}/issues?status=${status}&page=${page}`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_ISSUE_LIST,
        payload: request
    }
}

export const selectRequestList = (page, userId, repositoryName, status) => {
    const request = Api.get(`/${userId}/repositories/${repositoryName}/requests?status=${status}&page=${page}`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: SELECT_REQUEST_LIST,
        payload: request
    }
}

export const compareRepository = (userId, repositoryName) => {
    const request = Api.get(`/${userId}/repositories/${repositoryName}/compare`)
        .then(response => response)
        .catch(error => error.response);

    return {
        type: COMPARE_REPOSITORY,
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