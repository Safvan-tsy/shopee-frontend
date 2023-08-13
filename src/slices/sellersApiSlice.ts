import { SELLERS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";
import { Seller, User } from "../types/user.types";

export const sellersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    registration: builder.mutation<{ data: { user: User, seller: Seller }, token: string }, { data: any; token: string }>({
      query: ({data,token}) => ({
        url: `${SELLERS_URL}/register`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

  }),
});

export const {
  useRegistrationMutation
} = sellersApiSlice;
