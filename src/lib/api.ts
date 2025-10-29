import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    endpoints: (build) => ({
        getAllHotels: build.query({
            query: ()=> 'hotels',
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

export const { useGetAllHotelsQuery, useAddHotelMutation, useGetAllLocationsQuery } = api;