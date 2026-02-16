import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userservices from "./userservices";


export const fetchProfessors = createAsyncThunk(
    "professure/get",
    async ( _ , thunkApi) =>{
        try{
            return await userservices.fetchProfessure();
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)

export const addprofessure = createAsyncThunk(
    "professure/post",
    async(data1 , thunkApi)=>{
        try{
            return await userservices.addprofessure(data1) ; 
        }
        catch{
            return thunkApi.rejectWithValue("failed to update");
        }
    }
)


export const updataprofessure = createAsyncThunk(
    "professure/put" , 
    async (data , thunkApi) =>{
        try{
            return await userservices.updateprofdetails(data) ; 
        }
        catch{
            return thunkApi.rejectWithValue("failed to update");
        }
    }
)



// _______________________________________________________________________



export const fetchStudents = createAsyncThunk(
    "student/get",
    async(_ , thunkApi)=>{
        try{
            return await userservices.fetchstudent();
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)

export const fetchstudentbyid = createAsyncThunk(
    "studentbyid/get",
    async ( data , thunkApi) =>{
        try{
            return await userservices.fetchstudentbyid(data.id);
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)


export const addstudent = createAsyncThunk(
    "student/post",
    async(data , thunkApi)=>{
        try{
            return await userservices.addstudent(data);
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)

// _______________________________________________________________________


export const fetchActual = createAsyncThunk(
    "actual/get",
    async(_ , thunkApi)=>{
        try{
            return await userservices.fetchactual();
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)


export const createactualplan = createAsyncThunk(
    "actualcreate/post" ,
    async (data , thunkApi)=>{
        try{
            return await userservices.updateactual(data);
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)

// _______________________________________________________________________


export const fetchPlaned = createAsyncThunk(
    "planed/get",
    async(_ , thunkApi)=>{
        try{
            return await userservices.fetchplaned();
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)


export const addPlanned = createAsyncThunk(
    "planned/post",
    async(data , thunkApi)=>{
        try{
            return await userservices.addplanned(data);
        }
        catch(e){
            return thunkApi.rejectWithValue("Unable to get data")
        }
    }
)

const userReducer = createSlice({
    name: "users",
    initialState: {
        professors: [],
        students: [],
        planned: [],
        actual: [],
        user : null,
        error: null,
    },
    reducers: {
        verifyuser: (state, actions) => {
            const data = state.professors;
            const { email, password } = actions.payload;

            const found = data.find((u) => u.email === email && u.password === password);

            if (found) {
                state.user  = found;
                localStorage.setItem("userlogin", JSON.stringify(found));
                state.error = null 
            } else {
                localStorage.removeItem("userlogin");
                state.error = "Invalid email or password"
                state.user = null ; 
            }

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProfessors.fulfilled, (state, action) => {
                state.professors = action.payload;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.students = action.payload;
            })
            .addCase(fetchPlaned.fulfilled, (state, action) => {
                state.planned = action.payload;
            })
            .addCase(fetchActual.fulfilled, (state, action) => {
                state.actual = action.payload;
            });

    }
})

export const { verifyuser } = userReducer.actions
export default userReducer.reducer 