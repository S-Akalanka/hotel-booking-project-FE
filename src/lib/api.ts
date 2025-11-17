import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      if (window.Clerk && window.Clerk.session) {
        try {
          const token = await window.Clerk.session.getToken();
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } catch (err) {
          console.error("Failed to get Clerk token:", err);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Bookings", "Users"],
  endpoints: (build) => ({
    getAllHotels: build.query({
      query: () => "hotels",
    }),
    getHotelById: build.query({
      query: (_id) => `hotels/${_id}`,
    }),
    addHotel: build.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
    }),
    filterHotels: build.query({
      query: (filters) => {
        const params = new URLSearchParams({
          location: filters.location || "",
          checkIn: filters.checkIn || "",
          checkOut: filters.checkOut || "",
          guest: String(filters.guest || 0),
        });

        return {
          url: `/hotels/filter?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    searchHotels: build.query({
      query: (filters) => {
        const params = new URLSearchParams({
          query: filters.query || "",
          sortBy: filters.sortBy || "",
          page: filters.page || 1,
          maxPrice: filters.maxPrice || 0,
          minPrice: filters.minPrice || 0,
          rating: filters.rating || "",
          amenities: filters.amenities || [],
        });

        return {
          url: `/hotels/search?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getAllLocations: build.query({
      query: () => "locations",
    }),

    getUser: build.query({
      query: () => "users",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    createOrFetchUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
    getuserPastBookings: build.query({
      query: () => "users/bookings",
      providesTags: [{ type: "Bookings", id: "LIST" }],
    }),

    createBooking: build.mutation({
      query: (booking) => ({
        url: "booking",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: [{ type: "Bookings", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useAddHotelMutation,
  useFilterHotelsQuery,
  useSearchHotelsQuery,
  useGetAllLocationsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useCreateOrFetchUserMutation,
  useGetuserPastBookingsQuery,
  useCreateBookingMutation,
} = api;
