import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketProducts: [],
  length: 0,
  profileImage: "/images/user.webp",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasket: (state, action) => {
      state.basketProducts = action.payload;
    },
    updateBasketQuantity: (state, action) => {
      // state.basketProducts = state.basketProducts[
      //   action.payload.index
      // ].quantity = action.payload.e;

      return {
        ...state,
        basketProducts: [...state.basketProducts],
      };
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
    subProductPrice: (state, action) => {
      state.sum -= action.payload;
    },
    incProductPrice: (state, action) => {
      state.sum += action.payload;
    },
    setLoginMessage: (state, action) => {
      state.message = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});
export const {
  updateBasketQuantity,
  decLengthByOne,
  updateBasket,
  updateLength,
  updateLengthByOne,
  updateProductsQuantity,
  sumProductPrices,
  incProductPrice,
  subProductPrice,
  setLoginMessage,
  setProfileImage,
} = basketSlice.actions;

export const selectAllProducts = (state) => state.basket.basketProducts;

export default basketSlice.reducer;
