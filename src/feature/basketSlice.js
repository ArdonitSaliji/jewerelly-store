import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketProducts: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    updateBasket: (state, action) => {
      state.basketProducts = action.payload;
    },
  },
});
export const { updateBasket } = basketSlice.actions;

export const selectAllProducts = (state) => state.basket.basketProducts;

export default basketSlice.reducer;
