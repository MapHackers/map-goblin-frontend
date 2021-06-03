import {
    REPOSITORY_FILE_UPLOAD,
    ADD_UPLOAD_FILE,
    SAVE_REPOSITORY_INFO,
    ADD_SELECTED_CATEGORY,
    MODIFY_REPOSITORY_INFO,
    MODIFY_FILE, SELECT_ISSUE_LIST, SELECT_REQUEST_LIST
} from '../_actions/type'

const initialState = {
    thumbnail: "",
    fileList: [],
    info: {},
    selectedCategory: [],
    isModified: false,
    issueList: [],
    requestList: []
}

const repository = (state = initialState, action) => {
    switch (action.type) {
        case REPOSITORY_FILE_UPLOAD:
            return { ...state, thumbnail: action.payload.data }
        case ADD_UPLOAD_FILE:
            return { ...state, fileList: action.payload }
        case MODIFY_FILE:
            return { ...state, isModified: action.payload }
        case SAVE_REPOSITORY_INFO:
            return { ...state, info: action.payload.data }
        case MODIFY_REPOSITORY_INFO:
            return { ...state, info: action.payload.data }
        case ADD_SELECTED_CATEGORY:
            return {...state, selectedCategory: action.payload}
        case SELECT_ISSUE_LIST:
            return {...state, issueList: action.payload.data}
        case SELECT_REQUEST_LIST:
            return {...state, requestList: action.payload.data}
        default:
            return state;
    }
}

export default repository;