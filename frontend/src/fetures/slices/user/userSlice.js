import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userThunk";

const user = JSON.parse(localStorage.getItem("user"));
let accessToken = JSON.parse(localStorage.getItem("accessToken"));

let initialState = {
  isLoading: false,
  isError: false,
  user: user ? user : null,
  isSuccess: false,
  errorMessage: undefined,
  statusCode: undefined,
  successMessage: undefined,
  accessToken: accessToken ? accessToken : undefined,
};

let registerSlice = createSlice({
  name: "user Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.isSuccess = false;
      state.message = action.payload;
    });
    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = undefined;

      state.isSuccess = undefined;
      state.errorMessage = undefined;
      state.statusCode = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      let { accessToken, message, status, userInfo } = action.payload;

      state.isLoading = false;
      state.isSuccess = true;
      state.statusCode = status;
      state.successMessage = message;
      state.accessToken = accessToken;
      state.user = userInfo;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      let { data, status } = action.payload.response;
      state.isLoading = false;
      state.isError = true;

      localStorage.setItem("userInfo", JSON.stringify(data));

      state.isSuccess = false;
      state.errorMessage = data.error;
      state.statusCode = status;
      state.successMessage = undefined;
      state.accessToken = undefined;
      state.user = undefined;
    });
  },
});

export let { resetForm, userError } = registerSlice.actions;

export default registerSlice.reducer;
