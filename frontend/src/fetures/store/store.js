import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../slices/user/userSlice";

const store = configureStore({
  reducer: {
    auth: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
