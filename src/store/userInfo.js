import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfoByUserIdAPI } from '../util/api/user';

export const getUserInfo = createAsyncThunk('userInfo/getUserInfo', async (userId, thunkAPI) => {
  try {
    const response = await getUserInfoByUserIdAPI(userId);
    console.log('rerlekjr', response.data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  description: '',
  profile: '',
  mapList: [],
  rejected: false,
};

const userInfo = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    editUser(state, action) {
      console.log(action.payload)
      state.userName = action.payload.userName;
      state.description = action.payload.description;
      if(action.payload.profile === "profileDelete"){
        state.profile = ""
        return
      }
      state.profile = action.payload.profile;
    },
    setProfile(state, action) {
      state.profile = action.payload;
      return state;
    },
    setUserName(state, action) {
      state.userName = action.payload;
      return state;
    },
    setDescription(state, action) {
      state.description = action.payload;
      return state;
    },
  },
  extraReducers: {
    [getUserInfo.pending.type]: (state, action) => {
      state.loading = true;
      state.rejected = false;
    },
    [getUserInfo.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.userId = action.payload.userId;
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.description = action.payload.description;
      state.profile = action.payload.profile;
      state.mapList = action.payload.mapList;
    },
    [getUserInfo.rejected.type]: (state, action) => {
      state.loading = false;
      state.rejected = true;
      state.err = action.payload.message;
    },
  },
});

export const userInfoActions = { ...userInfo.actions };

export default userInfo;
