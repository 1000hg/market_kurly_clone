import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user_seq: -1,
    user_id: "",
    user_password: "",
    user_name: "",
    user_address_seq: -1,
    address: "",
    address_detail: "",
  },
  reducers: {
    SET_USER_INFO: (state, action) => {
      state.user_seq = action.payload.user_seq;
      state.user_id = action.payload.user_id;
      state.user_password = action.payload.user_password;
      state.user_name = action.payload.user_name;
      state.user_address_seq = action.payload.user_address_seq;
      state.address = action.payload.address;
      state.address_detail = action.payload.address_detail;
    },
    DELETE_USER_INFO: (state) => {
      state.user_seq = -1;
      state.user_id = "";
      state.user_password = "";
      state.user_name = "";
      state.user_address_seq = -1;
      state.address = "";
      state.address_detail = "";
    },
  },
});

export const { SET_USER_INFO, DELETE_USER_INFO } = userDataSlice.actions;

export default userDataSlice.reducer;
