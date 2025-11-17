import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import bookingReducer from "./features/bookingSlice";
import filterReducer from "./features/filterSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    booking: bookingReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
