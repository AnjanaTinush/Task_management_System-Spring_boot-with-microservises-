import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

export const submitTask=createAsyncThunk("submissions/submitTask",
    async ({taskId,githubLink})=>{
        setAuthHeader(localStorage.getItem("jwt",api));

        try {
            const {data} = await api.post(`/api/submissions?task_id=${taskId}&github_link=${githubLink}`,{});
            console.log("Submited task",data);
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
);


export const fetchAllSubmissions=createAsyncThunk("submissions/fetchAllSubmissions",
    async ()=>{
        setAuthHeader(localStorage.getItem("jwt",api));

        try {
            const {data} = await api.get(`/api/submissions`,{});
            console.log("fetch Submissions",data);
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
);


export const fetchSubmissionsByTaskId=createAsyncThunk("submissions/fetchSubmissionsByTaskId",
    async (taskId)=>{
        setAuthHeader(localStorage.getItem("jwt",api));

        try {
            const {data} = await api.get(`/api/submissions/task/${taskId}`,{});
            console.log("fetch Submissions by task id",data);
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
);



export const acceptDeclineSubmission=createAsyncThunk("submissions/acceptDeclineSubmission",
    async ({id,status})=>{
        setAuthHeader(localStorage.getItem("jwt",api));

        try {
            const {data} = await api.put(`/api/submissions/${id}?status=${status}`,{});
            console.log("accept task",data);
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
);


const submissionSlice = createSlice({
    name:"submissions",
    initialState:{
        submissions:[],
        status:'',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(submitTask.pending,(state)=>{
            state.status='loading';
        })
        .addCase(submitTask.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.submissions.push(action.payload);
        })
        .addCase(submitTask.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
        .addCase(fetchAllSubmissions.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.submissions=action.payload;
        })
        .addCase(fetchAllSubmissions.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
        .addCase(fetchSubmissionsByTaskId.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.submissions=action.payload;
        })
        .addCase(acceptDeclineSubmission.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.submissions=state.submissions.map((item)=>item.id!== action.payload.id ? item :action.payload);
        })
    }
})

export default submissionSlice.reducer;