import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../api/privateAxios";

//register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await privateAxios.post("/user/register", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//login
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await privateAxios.post("/user/login", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
