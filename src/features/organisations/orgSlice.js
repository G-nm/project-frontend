// Export orgslice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getAsyncOrgDetails = createAsyncThunk("org/details", async () => {
  const orgdetails = await axios.post(
    `${process.env.REACT_APP_SERVER}/orgdetails`,
    {},
    {
      withCredentials: true,
    }
  );
  return orgdetails.data;
});

// In createslice name->org,initialState->name,balance,reducers->requestorgdetails
const initialState = {
  orgname: "",
  balance: "",
  status: "idle",
  error: null,
  address: "",
};
export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    // increase balance after successfull deposit
    setBalance: (state, action) => {},
  },
  extraReducers: {
    [getAsyncOrgDetails.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAsyncOrgDetails.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.orgname = action.payload.name;
      state.balance = action.payload.balance;
      state.address = action.payload.address;
    },
    [getAsyncOrgDetails.rejected]: (state, action) => {
      state.status = "rejected";
      // console.log(action);
      state.error = action.error.message;
    },
  },
});

export const { requestorgdetails, logout } = orgSlice.actions;
export const requestdetails = (state) => state.organisation;

export default orgSlice.reducer;
