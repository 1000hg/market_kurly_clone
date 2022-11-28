import { createSlice } from "@reduxjs/toolkit";

export const cartDataSlice = createSlice({
  name: "cartData",
  initialState: {
    cart_count: 0,
    cart_seq: -1,
    cart_list: [],
    cart_add: {},
    cart_btn: false,
  },

  reducers: {
    SET_CART_INFO: (state, action) => {
      state.cart_count = action.payload.length;
      state.cart_seq = action.payload[0].cart_seq;
      state.cart_list = action.payload;
    },
    SET_GCART_INFO: (state, action) => {
      state.cart_count = action.payload.cartList.length;
      state.cart_seq = action.payload.cartList[0].guest_cart_seq;
      state.cart_list = action.payload.cartList;
    },
    DELETE_CART_INFO: (state) => {
      state.cart_count = 0;
      state.cart_seq = -1;
      state.cart_list = [];
      state.cart_add = {};
      state.cart_btn = false;
    },

    SELECTED_PRODUCT: (state, action) => {
      state.cart_add = action.payload;
      state.cart_btn = true;
    },
    SELECTED_PRODUCT_DEL: (state) => {
      state.cart_add = {};
      state.cart_btn = false;
    },
  },
});

// const cartBtnSelector = (state) => state.cart_btn;

// export const cartBtn = createSelector(cartBtnSelector, (cart_btn) => cart_btn);

export const {
  SET_CART_INFO,
  SET_GCART_INFO,
  DELETE_CART_INFO,
  SELECTED_PRODUCT,
  SELECTED_PRODUCT_DEL,
  ADD_CART,
  REMOVE_CART,
} = cartDataSlice.actions;

export default cartDataSlice.reducer;
