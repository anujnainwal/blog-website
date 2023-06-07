import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../slices/user/userSlice";
import categorySlice from "../slices/category/categorySlice";

const store = configureStore({
  reducer: {
    auth: registerSlice,
    categorySlice: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
