import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = {
  errors: [],
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    // payload is a string with errormessage
    setError: (state, action) => {
      return {
        errors: [
          ...state.errors,
          { errormessage: action.payload, id: nanoid() },
        ],
      };
    },
    // action.payload is the error id as string
    removeError: (state, action) => {
      return {
        errors: [
          ...state.errors.filter(
            (errorobject) => errorobject.id !== action.payload
          ),
        ],
      };
    },
  },
});

export const { setError, removeError } = errorSlice.actions;

// export const getErrorMessage = (state) => state.error.errormessage;

export default errorSlice.reducer;
