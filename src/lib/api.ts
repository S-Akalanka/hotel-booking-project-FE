import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/', 
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
            query: ()=> 'hotels',
        }),
        getHotelById: build.query({
            query: (_id)=> `hotels/${_id}`
        }),
        addHotel: build.mutation({
            query: (hotel)=>({
                url: 'hotels',
                method: 'POST',
                body: hotel
            })
        }),
        getAllLocations: build.query({
            query: ()=> 'locations'
        }),
    })
})

export const { useGetAllHotelsQuery, useGetHotelByIdQuery, useAddHotelMutation, useGetAllLocationsQuery } = api;