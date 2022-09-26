import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user_seq: -1,
    user_id: "",
    user_password: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    user_birth: "",
    gender: "",
    reffer_id: "",
    reffer_count: "",
    join_event_name: "",
    last_login_dtm: "",
    status: "",
    is_leave: "",
    leave_dtm: null,
    leave_reason: null,
    leave_comment: null,
    create_dtm: "",
    update_dtm: "",
    user_address_seq: -1,
    zip_code: "",
    address: "",
    address_detail: "",
    default_address: -1,
  },
  reducers: {
    SET_USER_INFO: (state, action) => {
      state.user_seq = action.payload.user_seq;
      state.user_id = action.payload.user_id;
      state.user_password = action.payload.user_password;
      state.user_name = action.payload.user_name;
      state.user_email = action.payload.user_email;
      state.user_phone = action.payload.user_phone;
      state.user_birth = action.payload.user_birth;
      state.gender = action.payload.gender;
      state.reffer_id = action.payload.reffer_id;
      state.reffer_count = action.payload.reffer_count;
      state.join_event_name = action.payload.join_event_name;
      state.last_login_dtm = action.payload.last_login_dtm;
      state.status = action.payload.status;
      state.is_leave = action.payload.is_leave;
      state.leave_dtm = action.payload.leave_dtm;
      state.leave_reason = action.payload.leave_reason;
      state.leave_comment = action.payload.leave_comment;
      state.create_dtm = action.payload.create_dtm;
      state.update_dtm = action.payload.update_dtm;
      state.user_address_seq = action.payload.user_address_seq;
      state.zip_code = action.payload.zip_code;
      state.address = action.payload.address;
      state.address_detail = action.payload.address_detail;
      state.default_address = action.payload.default_address;
    },
    DELETE_USER_INFO: (state) => {
      state.user_seq = -1;
      state.user_id = "";
      state.user_password = "";
      state.user_name = "";
      state.user_email = "";
      state.user_phone = "";
      state.user_birth = "";
      state.gender = "";
      state.reffer_id = "";
      state.reffer_count = "";
      state.join_event_name = "";
      state.last_login_dtm = "";
      state.status = "";
      state.is_leave = "";
      state.leave_dtm = null;
      state.leave_reason = null;
      state.leave_comment = null;
      state.create_dtm = "";
      state.update_dtm = "";
      state.user_address_seq = -1;
      state.zip_code = "";
      state.address = "";
      state.address_detail = "";
      state.default_address = -1;
    },
  },
});

export const { SET_USER_INFO, DELETE_USER_INFO } = userDataSlice.actions;

export default userDataSlice.reducer;
