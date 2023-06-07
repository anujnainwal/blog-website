import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../api/privateAxios";

export const createCategories = createAsyncThunk(
  "post/categories",
  async (categories, { rejectWithValue }) => {
    try {
      let response = await privateAxios.post("/category/create", {
        title: categories.category,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAll",
  async (categories, { rejectWithValue }) => {
    try {
      let response = await privateAxios.get("/category/allcategorys");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      let response = await privateAxios.delete("/category/deletecategory/" + id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
