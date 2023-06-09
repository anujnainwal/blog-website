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
      const response = await privateAxios.post("/user/login", user,{
        headers:{
          "Content-Type": "application/json	"
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

//fetch profile 
export const profileFetch = createAsyncThunk('user/profile',async (profile,{rejectWithValue})=>{
  try {
    let response = await privateAxios.get('user/profile')
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response)
  }
})