import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle",
  error: null,
  recipientsarray: [],
  selectedrecipient: {},
};

// recipients can be get,added,deleted,edited,selected as all

export const requestrecipients = createAsyncThunk(
  "recipients/details",
  async (empty = 0, { rejectWithValue }) => {
    try {
      let recipients = await axios.post(
        `${process.env.REACT_APP_SERVER}/selectrecipientsfororg`,
        {},
        { withCredentials: true }
      );
      return recipients.data;
    } catch (err) {
      let error = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const recipientSLice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    // returns all recipients gotten from db
    // payload is array of recipient objects
    addrecipient: (state, action) => {
      return {
        ...state,
        recipientsarray: [...state.recipientsarray, ...action.payload],
      };
    },
    // payload is string of userid
    deleterecipient: (state, action) => {
      return {
        ...state,
        recipientsarray: state.recipientsarray.filter(
          (recipient) => recipient.userid !== action.payload
        ),
      };
    },
    // payload is an object of recipient with edited details
    editrecipient: (state, action) => {
      // change the recipeint in the array with a certain id
      let newarrayofrecipients = state.recipientsarray.map((recipient) => {
        if (recipient.userid === action.payload.userid) {
          recipient = { ...recipient, ...action.payload };
          return recipient;
        } else {
          return recipient;
        }
      });
      return {
        ...state,
        recipientsarray: newarrayofrecipients,
      };
    },
    // takes in a recipient object
    selectedrecipient: (state, action) => {
      state.selectedrecipient = action.payload;
    },
    clearselectedrecipient: (state, action) => {
      state.selectedrecipient = initialState.selectedrecipient;
    },
  },
  extraReducers: {
    [requestrecipients.fulfilled]: (state, action) => {
      state.recipientsarray = action.payload;
      state.status = "fullfilled";
    },
    [requestrecipients.pending]: (state, action) => {
      state.status = "pending";
    },
    [requestrecipients.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export const {
  addrecipient,
  deleterecipient,
  editrecipient,
  getrecipients,
  selectedrecipient,
  clearselectedrecipient,
} = recipientSLice.actions;

export const selectallrecipients = (state) => state.recipients.recipientsarray;

export const selectonerecipient = (state, recipientuserid) =>
  state.recipients.recipientsarray.filter(
    (recipient) => recipient.userid === recipientuserid
  );

export default recipientSLice.reducer;
