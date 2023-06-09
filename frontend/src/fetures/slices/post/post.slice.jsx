import { createSlice } from "@reduxjs/toolkit";
import { createPost, fetchAllPost } from "./post.thunk";

let initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: undefined,
  successMessage: undefined,
  statusCode: undefined,
  posts: undefined,
  singlePost: undefined,
};
const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    //Fetch Post
    builder.addCase(fetchAllPost.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchAllPost.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload)
        let {postData,status,message} = action.payload
        return {...state,
          isLoading: false,
          isSuccess: true,
          successMessage:message,
          posts: postData,
          statusCode: status

        }
      } else {
        return { ...state };
      }
    });
    builder.addCase(fetchAllPost.rejected, (state, action) => {
      return {
        ...state,
        isLoading : false,
        isError: true,
        statusCode: action.payload
        
      }
   
    });

    // create post
    builder.addCase(createPost.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("created Post", action.payload);
      } else {
        return { ...state };
      }
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
    });

    
  },
});

export default postSlice.reducer;
