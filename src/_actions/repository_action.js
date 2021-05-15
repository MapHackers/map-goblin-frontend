import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO
} from './type'
import Api from "../util/Api";

export const addFile = (file) => {

    return {
        type: ADD_UPLOAD_FILE,
        payload: file
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