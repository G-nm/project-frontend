import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // payload is an object with notification and colour
    setNotification: (state, action) => {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            notification: action.payload.message,
            id: action.payload.id || nanoid(),
            status: action.payload.status || "success",
          },
        ],
      };
    },

    removeNotification: (state, action) => {
      return {
        ...state,
        notifications: [
          ...state.notifications.filter(
            (notificationobject) => notificationobject.id !== action.payload
          ),
        ],
      };
    },
  },
});

export const {
  removeNotification,
  setNotification,
} = notificationSlice.actions;

// export const getErrorMessage = (state) => state.error.errormessage;

export default notificationSlice.reducer;
