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
    searchHotels: build.query({
      query: (filterForm) => {
        const params = new URLSearchParams({
          location: filterForm.location || "",
          checkIn: filterForm.checkIn || "",
          checkOut: filterForm.checkOut || "",
          guest: String(filterForm.guest || 0),
        });

        return {
          url: `/hotels/search?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    // advanceSearchHotels: build.query({
    //   query: (advanceSearchParams:{
    //     location?: string;
    //     minPrice?: number;
    //     maxPrice?: number;
    //     sortBy?: string;
    //     page?: number;
    //   }) => ({
    //     url: 'hotels',
    //     method: 'GET',
    //     params: advanceSearchParams,
    //   })
    // })
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useAddHotelMutation,
  useGetAllLocationsQuery,
  useCreateOrFetchUserMutation,
  useCreateBookingMutation,
  useSearchHotelsQuery,
  // useAdvanceSearchHotelsQuery
} = api;
