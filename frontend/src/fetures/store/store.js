import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../slices/user/userSlice";
import categorySlice from "../slices/category/categorySlice";
import postSlice from "../slices/post/post.slice";

const store = configureStore({
  reducer: {
    auth: registerSlice,
    categorySlice: categorySlice,
    postSlice: postSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
