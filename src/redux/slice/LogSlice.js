
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from "axios";

const url = "http://localhost:5000/api/";
const token = Cookies.get("token")

const userSignup = createAsyncThunk("userSignup", async (payload) => {
    try {
        const response = await axios.post(`${url}user/register`, payload,);

        return response.data;
    } catch (error) {
        throw error;
    }
});
// userLogin
const userLogin = createAsyncThunk("userLogin", async (data) => {
    const response = await axios.post(`${url}login`, data,)
    Cookies.set("token", response.data.token)
    return response.data
})

//userPRofile
const getProfile = createAsyncThunk("getProfile", async () => {
    const response = await axios.get(`${url}me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    },)
 
    return response.data
})


const register = createSlice({
    name: "register",
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload; // Properly update state
                state.error = null;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            })
            // userlogin
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.error = null
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false
                state.error = null
            })
            //userProfile 
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.error = null
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false
                state.error = null
            })
    },
});
export { userSignup, userLogin, getProfile }
export default register.reducer;  
