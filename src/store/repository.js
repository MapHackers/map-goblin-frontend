import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllRepositoryAPI,
  getRepositoryByCategoryNameAPI,
  getLikedRepositoryByUserIdAPI,
} from '../util/api/repository';

const initialState = {
  allRepo: [],
  recommendRepo: [],
  likedRepo: [],
};

export const getAllRepo = createAsyncThunk('repository/getAllRepo', async (thunkAPI) => {
  try {
    const response = await getAllRepositoryAPI();
    return response.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

export const getRepoByCategoryName = createAsyncThunk(
  'repository/getRepoByCategoryName',
  async (categoryName, thunkAPI) => {
    try {
      const response = await getRepositoryByCategoryNameAPI(categoryName);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

export const getLikedRepositoryByUserId = createAsyncThunk(
  'repository/getLikedRepositoryByUserId',
  async (userId, thunkAPI) => {
    try {
      const response = await getLikedRepositoryByUserIdAPI(userId);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

const repository = createSlice({
  name: 'repository',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllRepo.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getAllRepo.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.allRepo = action.payload;
    },
    [getAllRepo.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload.message;
    },
    [getRepoByCategoryName.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getRepoByCategoryName.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.recommendRepo = [...state.recommendRepo, action.payload.data];
    },
    [getRepoByCategoryName.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    [getLikedRepositoryByUserId.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getLikedRepositoryByUserId.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.likedRepo = action.payload;
    },
    [getLikedRepositoryByUserId.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const repositoryActions = { ...repository.actions };

export default repository;
