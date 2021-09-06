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
    SAVE_REQUEST_REPLY, MERGE_REQUEST_DATA, DENIED_REQUEST_DATA, SELECT_CATEGORY_LIST, SELECT_PULL_DATA
} from '../_actions/type'

const initialState = {
    thumbnail: "",
    fileList: [],
    info: {},
    selectedCategory: [],
    isModified: false,
    issueList: [],
    requestList: [],
    compareResult: {},
    requestId: "",
    requestInfo: {},
    requestReply: [],
    pullData: {}
}

const space = (state = initialState, action) => {
    switch (action.type) {
        case SPACE_FILE_UPLOAD:
            return { ...state, thumbnail: action.payload.data }
        case ADD_UPLOAD_FILE:
            return { ...state, fileList: action.payload }
        case MODIFY_FILE:
            return { ...state, isModified: action.payload }
        case SAVE_SPACE_INFO:
            return { ...state, info: action.payload.data }
        case MODIFY_SPACE_INFO:
            return { ...state, info: action.payload.data }
        case ADD_SELECTED_CATEGORY:
            return {...state, selectedCategory: action.payload}
        case SELECT_ISSUE_LIST:
            return {...state, issueList: action.payload.data}
        case SELECT_REQUEST_LIST:
            return {...state, requestList: action.payload.data}
        case COMPARE_SPACE:
            return {...state, compareResult: action.payload.data}
        case CREATE_REQUEST:
            return {...state, requestId: action.payload.data.requestId}
        case SELECT_REQUEST_INFO:
            return {...state, requestInfo: action.payload.data}
        case SAVE_REQUEST_REPLY:
            return {...state, requestReply: [...state.requestReply, action.payload.data]}
        case MERGE_REQUEST_DATA:
            return {...state}
        case DENIED_REQUEST_DATA:
            return {...state}
        case SELECT_CATEGORY_LIST:
            return {...state}
        case SELECT_PULL_DATA:
            return {...state, pullData: action.payload.data}
        default:
            return state;
    }
}

export default space;