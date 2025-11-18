import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setAiQuery: (state, action)=>{
            state.query = action.payload;
        },
        resetAiQuery: (state)=>{
            state.query = "";
        }
    }
})

export const { setAiQuery,resetAiQuery } = searchSlice.actions;

export default searchSlice.reducer;
