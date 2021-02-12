import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orgReducer from "../features/organisations/orgSlice";
import recipientReducer from "../features/recipients/recipientsSlice";
import errorReducer from "../features/errors/errorSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import authReducer from "../features/authentication/authSlice";
import productsReducer from "../features/products/productsSLice";
import orgmerchantReducer from "../features/orgmerchants/orgmerchantSLice";
import merchantReducer from "../features/merchant/merchantSLice";

const combinedReducer = combineReducers({
  organisation: orgReducer,
  recipients: recipientReducer,
  errors: errorReducer,
  notifications: notificationReducer,
  auth: authReducer,
  products: productsReducer,
  orgmerchant: orgmerchantReducer,
  merchant: merchantReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/onlogout") {
    window.localStorage.clear();
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
