import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAuthAPI } from '../util/api/user';

export const userAuth = createAsyncThunk('user/auth', async (userToken, thunkAPI) => {
  try {
    const response = await userAuthAPI(userToken);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

const initialState = {
  loginStatus: false,
  id: 0,
  userId: '',
  userName: '',
  userEmail: '',
  description: '',
  profile: '',
};

const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
      return state;
    },
  },
  extraReducers: {
    [userAuth.pending.type]: (state, action) => {
      state.loading = true;
    },
    [userAuth.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.loginStatus = true;
      state.userName = action.payload.name;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.id = action.payload.id;
      state.description = action.payload.description;
      state.profile = action.payload.profile;
      state.data = action.payload;
    },
    [userAuth.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload.message;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
