import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO,
    ADD_SELECTED_CATEGORY,
    MODIFY_REPOSITORY_INFO,
    MODIFY_FILE
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