import  { createAsyncThunk } from '@reduxjs/toolkit';
import {privateAxios} from '../../../api/privateAxios'

//fetchAll post 
export const fetchAllPost = createAsyncThunk('post/fetchAllData',async (postData,{rejectWithValue})=>{
    try {
        let response = await privateAxios.get('/post/allPost',)
        return response.data
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//create a post ACCESS_TOKEN 
export const createPost = createAsyncThunk('post/created',async (postData,{rejectWithValue})=>{
    console.log('post',postData)
    try {
        privateAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        let response = await privateAxios.post('/post/createPost',postData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        )
        return response.data
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//update a post
export const updatePost = createAsyncThunk('post/updatePost',async (updatePost,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//single Post fetch
export const singlePost = createAsyncThunk('post/singlePost',async (singlePost,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//delete post fetch 
export const deletePost = createAsyncThunk('post/delete',async (deletePost,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//user Like the Post
export const userLike = createAsyncThunk('post/userLike',async (likePost,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})

//user DisLike the post

export const userDisLike = createAsyncThunk('post/userDisLike',async (dislikePost,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        return rejectWithValue(error?.responseText)
    }
})