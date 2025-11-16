import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      // Wait until Clerk is loaded
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
    getAllLocations: build.query({
      query: () => "locations",
    }),
    createOrFetchUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
    createBooking: build.mutation({
      query: (booking) => ({
        url: "booking",
        method: "POST",
        body: booking,
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
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useAddHotelMutation,
  useGetAllLocationsQuery,
  useCreateOrFetchUserMutation,
  useCreateBookingMutation,
  useFilterHotelsQuery,
  useSearchHotelsQuery,
} = api;
