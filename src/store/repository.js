import { createSlice } from '@reduxjs/toolkit';
import { getDate } from '../util/dateCalculate';

const initialState = {
  id: 0,
  mapId: 0,
  name: '',
  oneWord: '',
  source: '',
  owners: [],
  thumbnail: '',
  authority: '',
  categories: [],
  description: '',
  dislikeCount: 0,
  likeCount: 0,
  likeType: '',
  hostId: 0,
  hostRepoName: '',
  hostUserId: '',
  fileList: [],
  isModified: false,
  info: '',
  selectedCategory: '',
  waitIssueList: [],
  checkedIssueList: [],
  requestWaitList: [],
  requestAcceptedList: [],
  requestDeniedList: [],
  compareResult: '',
  requestId: '',
  requestInfo: '',
  requestReply: [],
  pullData: '',
  categoryOptions: [],
  modifyCategory: [],
};

const repository = createSlice({
  name: 'repository',
  initialState: initialState,
  reducers: {
    setRepositoryInfo(state, action) {
      state.id = action.payload.id;
      state.mapId = action.payload.map_id;
      state.name = action.payload.name;
      state.oneWord = action.payload.oneWord;
      state.source = action.payload.source;
      state.owners = action.payload.owners;
      state.thumbnail = action.payload.thumbnail;
      state.authority = action.payload.authority;
      state.categories = action.payload.categories;
      state.description = action.payload.description;
      state.dislikeCount = action.payload.dislikeCount;
      state.likeCount = action.payload.likeCount;
      state.likeType = action.payload.likeType;
      state.hostId = action.payload.hostId;
      state.hostRepoName = action.payload.hostRepoName;
      state.hostUserId = action.payload.hostUserId;
    },
    setCategoryOptions(state, action) {
      state.categoryOptions = action.payload;
    },
    setModifyCategory(state, action) {
      state.modifyCategory = [...state.modifyCategory, action.payload];
    },
    setWaitingIssueList(state, action) {
      let tempList = [];
      action.payload.forEach((data) => {
        let temp = {
          date: getDate(data.createdDate),
          key: data.id,
          tags: [data.tag],
          title: data.title,
          type: 'issue',
          user: data.createdBy,
        };
        tempList.push(temp);
      });
      state.waitIssueList = tempList;
    },
    setCheckedIssueList(state, action) {
      let tempList = [];
      action.payload.forEach((data) => {
        let temp = {
          date: getDate(data.createdDate),
          key: data.id,
          tags: [data.tag],
          title: data.title,
          type: 'issue',
          user: data.createdBy,
        };
        tempList.push(temp);
      });
      state.checkedIssueList = tempList;
    },
    setWaitRequestList(state, action) {
      let tempList = [];
      action.payload.forEach((data) => {
        let temp = {
          date: getDate(data.createdDate),
          key: data.id,
          tags: [data.tag],
          title: data.title,
          type: 'request',
          user: data.createdBy,
        };
        tempList.push(temp);
      });
      state.requestWaitList = tempList;
    },
    setAccpetedRequestList(state, action) {
      let tempList = [];
      action.payload.forEach((data) => {
        let temp = {
          date: getDate(data.createdDate),
          key: data.id,
          tags: [data.tag],
          title: data.title,
          type: 'request',
          user: data.createdBy,
        };
        tempList.push(temp);
      });
      state.requestAcceptedList = tempList;
    },
    setDeniedRequestList(state, action) {
      let tempList = [];
      action.payload.forEach((data) => {
        let temp = {
          date: getDate(data.createdDate),
          key: data.id,
          tags: [data.tag],
          title: data.title,
          type: 'request',
          user: data.createdBy,
        };
        tempList.push(temp);
      });
      state.requestDeniedList = tempList;
    },
    extraReducers: {},
  },
});

export const repositoryActions = { ...repository.actions };

export default repository;
