import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:""
    },
    reducers:{
        saveUser:(state,action) => { 
             state.user ={...action.payload}
         }
    }
})
export const {saveUser} = userSlice.actions
export default userSlice.reducer