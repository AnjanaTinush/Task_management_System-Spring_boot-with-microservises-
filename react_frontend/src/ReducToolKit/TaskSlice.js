import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api,setAuthHeader } from "../api/api";
import { Loader } from "lucide-react";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

export const fetchTasks=createAsyncThunk("task/fetchTasks",
    async({status})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get("/api/tasks",{
                params:{status}
            })
            console.log("fetch tasks :",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)


export const fetchUsersTask=createAsyncThunk("task/fetchUsersTask",
    async({status})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get("/api/tasks/user",{
                params:{status}
            })
            console.log("fetch users tasks :",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)


export const fetchTaskById=createAsyncThunk("task/fetchTaskById",
    async({taskId})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.get(`/api/tasks/user/${taskId}`);
            console.log("fetch task by id :",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)


export const createTask=createAsyncThunk("task/createTask",
    async(taskData)=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.post(`/api/tasks`,taskData);
            console.log("task created success :",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)

export const updateTask=createAsyncThunk("task/updateTask",
    async({id,updatedTaskData})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.put(`/api/tasks/${id}`,updatedTaskData);
            console.log("Task updated success",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)



export const assignedTaskToUser=createAsyncThunk("task/assignedTaskToUser",
    async({taskId,userID})=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.put(`/api/tasks/${taskId}/user/${userID}`);
            console.log("assigned Task",data)
            return data;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)

export const deleteTask=createAsyncThunk("task/deleteTask",
    async(taskId)=>{
        setAuthHeader(localStorage.getItem("jwt"),api)
        try {
            const {data} = await api.delete(`/api/tasks/${taskId}`);
            console.log("Task delete success",data)
            return taskId;
        } catch (error) {
            console.log("error",error)
            throw new Error(error.response?.data?.error || "Unknown error"); 
        }
    }
)


const taskSlice=createSlice({
    name:"task",
    initialState:{
        tasks:[],
        Loading:false,
        error:null,
        taskDetaild:null,
        usersTask:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTasks.pending,(state)=>{
            state.Loading=true
            state.error=null
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.Loading=false;
            state.tasks=action.payload
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.error=action.error.message;
            state.Loading=false;
        })
        .addCase(fetchUsersTask.pending,(state)=>{
            state.Loading=true
            state.error=null
        })
        .addCase(fetchUsersTask.fulfilled,(state,action)=>{
            state.Loading=false;
            state.usersTask=action.payload
        })
        .addCase(fetchUsersTask.rejected,(state,action)=>{
            state.error=action.error.message;
            state.Loading=false;
        })
        .addCase(createTask.pending,(state)=>{
            state.Loading=true
            state.error=null
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.Loading=false;
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.error=action.error.message;
            state.Loading=false;
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const updatedTask=action.payload;
            state.Loading=false;
            state.tasks=state.tasks.map((task)=>
                task.id===updatedTask.id?{...task,...updatedTask}:task
            )
        })
        .addCase(assignedTaskToUser.fulfilled,(state,action)=>{
            const updatedTask=action.payload;
            state.Loading=false;
            state.tasks=state.tasks.map((task)=>
                task.id===updatedTask.id?{...task,...updatedTask}:task
            )
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.Loading=false;
            state.tasks=state.tasks.filter((task)=>task.id!==action.payload)
        })
        
    }
})


export default taskSlice.reducer;





