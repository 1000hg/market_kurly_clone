import { createSlice } from "@reduxjs/toolkit";

export const cartDataSlice = createSlice({
  name: "cartData",
  initialState: {
    total_product_count: 0,
  },
  reducers: {
    SET_CART_INFO: (state, action) => {
      state.total_product_count = parseInt(action.payload.total_product_count);
    },
    DELETE_CART_INFO: (state) => {
      state.total_product_count = 0;
    },
    ADD_CART: (state) => {
      state.total_product_count += 1;
    },
    REMOVE_CART: (state) => {
      state.total_product_count -= 1;
    },
  },
});

export const { SET_CART_INFO, DELETE_CART_INFO, ADD_CART, REMOVE_CART } =
  cartDataSlice.actions;

export default cartDataSlice.reducer;
