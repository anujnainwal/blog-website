import { createSlice } from "@reduxjs/toolkit";
import { createCategories, deleteCategory, fetchAllCategory } from "./categoryThunk";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: undefined,
  successMessage: undefined,
  statusCode: undefined,
  categories: undefined,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch All Categories
    builder.addCase(fetchAllCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = undefined;
      state.successMessage = undefined;
      state.statusCode = undefined;
      state.categories = undefined;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      let { categoryInfo, message } = action.payload;

      state.isSuccess = true;

      state.successMessage = message;
      state.categories = categoryInfo;
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      console.log("rejected", action.payload);
    });
    //create a new category
    builder.addCase(createCategories.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = undefined;
      state.successMessage = undefined;
      state.statusCode = undefined;
      state.categories = undefined;
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      let { message, categoryInfo } = action.payload;

      state.isSuccess = true;
      state.successMessage = message;
      state.categories = categoryInfo;
    });
    builder.addCase(createCategories.rejected, (state, action) => {
      state.isLoading = false;
      let {
        data: { error },
        status,
      } = action.payload;
      state.isError = true;
      state.errorMessage = error;
      state.statusCode = status;
    });
    
    //delete category
    builder.addCase(deleteCategory.pending,(state, action) => {
      state.isLoading = true;
    })
    builder.addCase(deleteCategory.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = action.payload.message

    })
    builder.addCase(deleteCategory.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = action.payload.error
    })
  },
});
export default categorySlice.reducer;
