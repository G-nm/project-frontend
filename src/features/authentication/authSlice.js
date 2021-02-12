import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loggedin: window.localStorage.getItem("loggedin") || "",
  role: window.localStorage.getItem("role") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onlogin: (state, action) => {
      window.localStorage.setItem("loggedin", "true");
      window.localStorage.setItem("role", action.payload);
      return {
        loggedin: true,
        role: action.payload,
      };
    },
    onlogout: (state, action) => {
      
    },
  },
});

export const { onlogin, onlogout } = authSlice.actions;

export default authSlice.reducer;
