import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  products: {},
  selectedproduct: {},
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setproducts: (state, action) => {
      return {
        ...state,
        products: { ...action.payload },
      };
    },
    // Payload is one product
    selectproduct: (state, action) => {
      return {
        ...state,
        selectedproduct: {
          ...action.payload,
        },
      };
    },
    clearselectedproduct: (state, action) => {
      return {
        ...state,
        selectedproduct: {},
      };
    },
  },
});

export const {
  clearselectedproduct,
  setproducts,
  selectproduct,
} = productsSlice.actions;

export default productsSlice.reducer;
