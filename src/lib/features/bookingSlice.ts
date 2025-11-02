import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkInDate: null,
  checkOutDate: null,
  rooms: 0,
  noOfGuests: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
        
      const { checkInDate, checkOutDate, rooms, noOfGuests } = action.payload;

      state.checkInDate = checkInDate;
      state.checkOutDate = checkOutDate;
      state.rooms = rooms;
      state.noOfGuests = noOfGuests;
    },
    resetBooking: () => initialState,
  },
});

export const { setBookingDetails, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
