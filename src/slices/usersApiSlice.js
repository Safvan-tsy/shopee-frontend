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
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        profile: builder.mutation({
            query: ({ data, token }) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            })
        }),
        getAllUsers:builder.query({
            query:(token)=>({
                url:USERS_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                providesTags:['Users'],
                keepUnusedDataFor:5
            })
        }),
        deleteUser:builder.mutation({
            query:({userId,token})=>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        }),
        getUserDetails:builder.query({
            query:({userId,token})=>({
                url:`${USERS_URL}/${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                keepUnusedDataFor:5
            })
        }),
        updateUser:builder.mutation({
            query:({data,token})=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }),
            invalidatesTags:['Users']
        })

    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = usersApiSlice;