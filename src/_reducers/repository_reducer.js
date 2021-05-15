import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO
} from '../_actions/type'

const initialState = {
    thumbnail: "",
    fileList: [],
    info: {}
}

const repository = (state = initialState, action) => {
    switch (action.type) {
        case REPOSITORY_FILE_UPLOAD:
            console.log("REPOSITORY_FILE_UPLOAD")

            return { ...state, thumbnail: action.payload.data }
        case ADD_UPLOAD_FILE:
            console.log("ADD_UPLOAD_FILE")

            return { ...state, fileList: action.payload }
        case SAVE_REPOSITORY_INFO:
            console.log("SAVE_REPOSITORY_INFO")

            return { ...state, info: action.payload.data }
        default:
            return state;
    }
}

export default repository;