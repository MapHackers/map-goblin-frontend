import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upload: 'null',
};

const file = createSlice({
  name: 'file',
  initialState: initialState,
  reducers: {
    setUpload(state, action) {
      state.upload = action.payload;
    },
  },
});

export const fileActions = { ...file.actions };

export default file;
