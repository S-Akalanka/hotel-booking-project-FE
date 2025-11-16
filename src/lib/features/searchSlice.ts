import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  sortBy: "",
  page: 1,
  maxPrice: 1000,
  minPrice: 0,
  rating: 0,
  amenities: [] as string[],
};

export const searchSlice = createSlice({
  name: "advanceFilter",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    clearAllFilters: (state)=>{
      state.minPrice =0;
      state.maxPrice=1000;
      state.rating=0;
      state.amenities=[];
    },
    resetSearch: () => initialState,
  },
});

export const {
  setQuery,
  setSortBy,
  setPage,
  setMaxPrice,
  setMinPrice,
  setRating,
  setAmenities,
  clearAllFilters,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
