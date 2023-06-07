import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userThunk";

const user = JSON.parse(localStorage.getItem("userInfo"));
let accessToken = JSON.parse(localStorage.getItem("accessToken"));
let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
let initialState = {
  isLoading: false,
  isError: false,
  user: user ? user : undefined,
  isSuccess: false,
  errorMessage: undefined,
  statusCode: undefined,
  successMessage: undefined,
  accessToken: accessToken ? accessToken : undefined,
  refreshToken: refreshToken ? refreshToken : undefined,
};

let registerSlice = createSlice({
  name: "user Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.user = undefined;
      state.isSuccess = false;
      state.errorMessage = undefined;
      state.statusCode = undefined;
      state.successMessage = undefined;
      state.accessToken = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      let { status, message, userInfo, accessToken, refreshToken } =
        action.payload;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      state.isSuccess = true;
      state.successMessage = message;
      state.user = userInfo;
      state.statusCode = status;
      state.accessToken = accessToken;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      let {
        status,
        data: { error },
      } = action.payload;
      localStorage.clear();
      state.isError = true;
      state.isSuccess = false;
      state.statusCode = status;
      state.errorMessage = error;
    });
  },
});

export let { resetForm, userError } = registerSlice.actions;

export default registerSlice.reducer;
