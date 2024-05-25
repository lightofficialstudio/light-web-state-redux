import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// reducer
import counterReducer from "./slice";
import userReducer from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
});

// todo : อธิบาย : store และ configureStore ใน redux toolkit
export type RootState = ReturnType<typeof store.getState>;
// todo : อธิบาย : AppDispatch ใน redux toolkit
export type AppDispatch = typeof store.dispatch;
