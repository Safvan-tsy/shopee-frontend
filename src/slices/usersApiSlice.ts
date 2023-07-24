import { USERS_URL } from "../utils/constants";
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
        logout: builder.mutation<void, void>({
            // The first generic type 'void' represents the expected response data.
            // The second generic type 'void' represents the data passed to the mutation query (in this case, there's no data).
            query: () => ({
              url: `${USERS_URL}/logout`,
              method: 'POST',
            }),
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
                providesTags:['User'],
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
            invalidatesTags:['User']
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