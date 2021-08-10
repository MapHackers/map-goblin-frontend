import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMapDataAPI } from '../util/api/map';

export const loadMapData = createAsyncThunk('map/loadData', async (mapId, thunkAPI) => {
  try {
    const response = await getMapDataAPI(mapId);
    return response.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(await e.response.data);
  }
});

const initialState = {
  layer: [],
  gpsLat: 0,
  gpsLng: 0,
  clickedMarker: {},
};

const map = createSlice({
  name: 'map',
  initialState: initialState,
  reducers: {
    setGpsLatLng(state, action) {
      state.gpsLat = action.payload.gpsLat;
      state.gpsLng = action.payload.gpsLng;
    },
    setClickedMarker(state, action) {
      state.clickedMarker = action.payload;
    },
    setClickedMarkerReview(state, action) {
      state.clickedMarker.reviews = action.payload;
    },
  },
  extraReducers: {
    [loadMapData.pending.type]: (state, action) => {
      state.loading = true;
    },
    [loadMapData.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.layer = action.payload;
    },
    [loadMapData.rejected.type]: (state, action) => {
      state.loading = false;
      state.err = action.paylod;
    },
  },
});

export const mapActinos = { ...map.actions };

export default map;
