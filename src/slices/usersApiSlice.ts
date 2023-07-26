import { USERS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";
import { User } from "../types/user.types";
import { LoginResponse } from "../types/state.types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ data:{user:User},token: string }, { email:string ,password:string}>({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<{data:{user:User},token: string }, { name:string,email:string,password:string,passwordConfirm:string }>({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation<void, { data: any; token: string }>({
      query: ({ data, token }) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    getAllUsers: builder.query<{ users: any[] }, string>({
      query: (token) => ({
        url: USERS_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['User'],
        keepUnusedDataFor: 5,
      }),
    }),
    deleteUser: builder.mutation<void, { userId: string; token: string }>({
      query: ({ userId, token }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserDetails: builder.query<{ user: any }, { userId: string; token: string }>({
      query: ({ userId, token }) => ({
        url: `${USERS_URL}/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        keepUnusedDataFor: 5,
      }),
    }),
    updateUser: builder.mutation<void, { data: any; token: string }>({
      query: ({ data, token }) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
