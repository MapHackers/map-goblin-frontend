import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadAlarmAPI } from '../util/api/alarm';

const initialState = {
  userAlarm: [],
  navAlarm: [],
};

export const getAllAlarm = createAsyncThunk('alarm/getAllAlarm', async (userId, thunkAPI) => {
  try {
    const response = await loadAlarmAPI(userId);
    console.log(response.data)
    return response.data.data;
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
      state.userAlarm =  action.payload
      state.navAlarm = action.payload
    },
    [getAllAlarm.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const alarmActions = { ...alarm.actions };

export default alarm;
