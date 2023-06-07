import { createSlice } from "@reduxjs/toolkit";

let initialState ={
    isLoading:false,
    isError: false,
    isSuccess: false,
    errorMessage: undefined,
    successMessage: undefined,
    posts: undefined,
    singlePost: undefined,
    
}