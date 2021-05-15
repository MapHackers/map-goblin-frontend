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
    Api.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }})
        .then(response => {
            console.log("fileUpload action response***********")
            console.log(response)

            return {
                type: REPOSITORY_FILE_UPLOAD,
                payload: response
            }
    }).catch(error => {
        console.log("fileUpload action error***********")
        console.log(error)
    })

}

export const saveRepositoryInfo = (values) => {
    Api.post('/repositories', values)
        .then(response=>{
            console.log("saveRepositoryInfo action response***********")
            console.log(response)

            return {
                type: SAVE_REPOSITORY_INFO,
                payload: response
            }
    }).catch(error=>{
        console.log("saveRepositoryInfo action error***********")
        console.log(error)
        alert(error.response.data.message);
    });
}