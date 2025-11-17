import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  checkIn: undefined,
  checkOut: undefined,
  guest: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    setGuest: (state, action) => {
      state.guest = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setLocation, setCheckIn, setCheckOut, setGuest, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
