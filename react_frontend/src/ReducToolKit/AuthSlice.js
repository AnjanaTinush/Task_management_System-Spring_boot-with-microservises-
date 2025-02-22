import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL, setAuthHeader } from "../api/api";

export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Login success", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw new Error(error.response?.data?.error || "Unknown error");
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Register success", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw new Error(error.response?.data?.error || "Unknown error");
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        localStorage.clear();
        console.log("Logout success");
        return { success: true };
    } catch (error) {
        console.log("catch error", error);
        throw new Error(error.response?.data?.error || "Unknown error");
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/user/profile`);
        console.log("User profile success", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw new Error(error.response?.data?.error || "Unknown error");
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/user/profile`);
        console.log("User list success", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw new Error(error.response?.data?.error || "Unknown error");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        login: false,
        loading: false,
        error: null,
        jwt: null,
        users: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
                state.user = action.payload.user; // Add user data to the state if returned
            })            
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user=action.payload;
                state.loggedIn = true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users=action.payload;
                state.loggedIn = true;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user=null;
                state.jwt=null;
                state.users=[];
                state.error=null;
                state.loggedIn=false;
            })
            
    },
});

export default authSlice.reducer;
