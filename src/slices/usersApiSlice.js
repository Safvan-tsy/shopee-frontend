import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        register:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/signup`,
                method:'POST',
                body:data,
            })
        }),
        logout:builder.mutation({
            query:()=> ({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
        profile:builder.mutation({
            query:({data,token})=> ({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation , useProfileMutation} = usersApiSlice;