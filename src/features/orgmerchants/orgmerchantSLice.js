// should contain merchantsunder the organisation
// should contain all merchants not under the organisation

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orgmerchants: [],
  othermerchants: [],
};

const merchantSlice = createSlice({
  name: "orgmerchant",
  initialState,
  reducers: {
    //   payload is array of merchants under an organisation
    setorgmerchants: (state, action) => {
      return {
        ...state,
        orgmerchants: [...action.payload],
      };
    },
    // payload is array of merchants not under this organisation
    setothermerchants: (state, action) => {
      return {
        ...state,
        othermerchants: [...action.payload],
      };
    },
    // payload is id of merchant to add to this organisation
    editorgmerchants: (state, action) => {
      // should remove this merchant from other merchants and add to org merchants
      let merchanttoaddtoorg = state.othermerchants.filter(
        (merchant) => merchant.id === action.payload
      );
      let merchantsleftinothermerchants = state.othermerchants.filter(
        (merchant) => merchant.id !== action.payload
      );
      return {
        ...state,
        orgmerchants: [...state.orgmerchants, ...merchanttoaddtoorg],
        othermerchants: [...merchantsleftinothermerchants],
      };
    },
    // payload is merchant id removed by an organisation
    // This is removing a merchant fro the org and adding to others
    editothermerchants: (state, action) => {
      let merchanttoaddtoothers = state.orgmerchants.filter(
        (merchant) => merchant.id === action.payload
      );
      let merchantsleftinorgmerchants = state.orgmerchants.filter(
        (merchant) => merchant.id !== action.payload
      );
      return {
        ...state,
        othermerchants: [...state.othermerchants, ...merchanttoaddtoothers],
        orgmerchants: [...merchantsleftinorgmerchants],
      };
    },
  },
});

export const {
  editorgmerchants,
  editothermerchants,
  setorgmerchants,
  setothermerchants,
} = merchantSlice.actions;

export default merchantSlice.reducer;
