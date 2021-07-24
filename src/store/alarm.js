import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userAlarm: [],
  navAlarm: [],
};

export const getAllAlarm = createAsyncThunk('alarm/getAllAlarm', async (userId, thunkAPI) => {
  try {
    const response = await getAllAlarm(userId);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

const alarm = createSlice({
  name: 'alarm',
  initialState: initialState,
  reducers: {
    deleteAllAlarm(state, action) {
      return { ...state, navAlarm: { data: [] } };
    },
  },
  extraReducers: {
    [getAllAlarm.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getAllAlarm.fulfilled.type]: (state, action) => {
      state.loading = false;
      state = { ...state, userAlarm: action.payload, navAlarm: action.payload };
    },
    [getAllAlarm.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const alarmActions = { ...alarm.actions };

export default alarm;
