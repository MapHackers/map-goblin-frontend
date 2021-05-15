import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO
} from '../_actions/type'

const initialState = {
    fileList: []
}

const repository = (state = initialState, action) => {
    switch (action.type) {
        case REPOSITORY_FILE_UPLOAD:
            console.log("REPOSITORY_FILE_UPLOAD")
            console.log(action.payload)
            return { ...state }
        case ADD_UPLOAD_FILE:
            console.log("ADD_UPLOAD_FILE")
            console.log(action.payload)
            state.fileList.concat(action.payload)
            return { ...state }
        case SAVE_REPOSITORY_INFO:
            console.log("SAVE_REPOSITORY_INFO")
            console.log(action.payload)
            return { ...state }
        default:
            return state;
    }
}

export default repository;