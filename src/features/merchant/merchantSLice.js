import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncMerchantDetails = createAsyncThunk(
  "merchant/details",
  async () => {
    const merchantdetails = await axios.post(
      `${process.env.REACT_APP_SERVER}/merchantdetails`,
      {},
      {
        withCredentials: true,
      }
    );

    return merchantdetails.data;
  }
);

const initialState = {
  merchantname: "",
  balance: "",
  status: "idle",
  error: null,
  userid: "",
  address: "",
};

const merchantSLice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    setMerchant: (state, action) => {
      return {
        ...state,
        balance: action.payload.balance,
        merchantname: action.payload.name,
        userid: action.payload.userid,
        address: action.payload.address,
      };
    },
  },
  extraReducers: {
    [getAsyncMerchantDetails.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAsyncMerchantDetails.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.merchantname = action.payload.name;
      state.balance = action.payload.balance;
      state.userid = action.payload.userid;
      state.address = action.payload.address;
    },
    [getAsyncMerchantDetails.rejected]: (state, action) => {
      state.status = "rejected";
      // console.log(action);
      state.error = action.error.message;
    },
  },
});
export const { setMerchant } = merchantSLice.actions;
export default merchantSLice.reducer;
