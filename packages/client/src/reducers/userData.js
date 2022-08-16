import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    address: null,
  },
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const {
  updateUserId,
  updateDisplayName,
  updateRoomId,
  updatePhotoURL,
  updateCurrentTime,
  updateInRoom,
  updatePlayedVideo,
  updateLocation,
} = userDataSlice.actions;

export default userDataSlice.reducer;
