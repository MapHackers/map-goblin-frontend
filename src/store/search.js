import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRepositoryAPI, searchUserAPI } from '../util/api/search';

export const searchRepository = createAsyncThunk('search/repository', async (keyword, thunkAPI) => {
  try {
    const response = await searchRepositoryAPI(keyword);
    return response.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

export const searchUser = createAsyncThunk('search/user', async (keyword, thunkAPI) => {
  try {
    const response = await searchUserAPI(keyword);
    return response.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

const initialState = {
  searchUser: [],
  searchRepo: [],
};

const search = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [searchRepository.pending.type]: (state, action) => {
      state.loading = true;
    },
    [searchRepository.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.searchRepo = action.payload;
    },
    [searchRepository.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.paylod;
    },
    [searchUser.pending.type]: (state, action) => {
      state.loading = true;
    },
    [searchUser.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.searchUser = action.payload;
    },
    [searchUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.paylod;
    },
  },
});

export const searchActions = { ...search.actions };

export default search;
