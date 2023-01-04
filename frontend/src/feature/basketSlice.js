import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketProducts: [],
  length: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasket: (state, action) => {
      state.basketProducts = action.payload;
    },
    updateLength: (state, action) => {
      state.length = action.payload;
    },
    updateLengthByOne: (state) => {
      state.length += 1;
    },
    decLengthByOne: (state) => {
      state.length -= 1;
    },
    updateProductsQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    sumProductPrices: (state, action) => {
      state.sum = action.payload;
    },
    subtractPrice: (state, action) => {
      state.sum -= action.payload;
    },
    setLoginMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});
export const {
  decLengthByOne,
  updateBasket,
  updateLength,
  updateLengthByOne,
  updateProductsQuantity,
  sumProductPrices,
  subtractPrice,
  setLoginMessage,
} = basketSlice.actions;

export const selectAllProducts = (state) => state.basket.basketProducts;

export default basketSlice.reducer;
