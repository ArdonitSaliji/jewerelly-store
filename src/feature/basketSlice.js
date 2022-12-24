import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketProducts: [],
  length: 0,
};

export const basketSlice = createSlice({
  name: 'basket',
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
  },
});
export const { updateBasket, updateLength, updateLengthByOne } = basketSlice.actions;

export const selectAllProducts = (state) => state.basket.basketProducts;

export default basketSlice.reducer;
