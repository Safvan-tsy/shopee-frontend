import { SELLERS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";
import { Seller, User } from "../types/user.types";

export const sellersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    registration: builder.mutation<{ data: { user: User, seller: Seller }, token: string }, { pan: string, phone: string, password: string, displayName: string }>({
      query: (data) => ({
        url: `${SELLERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useRegistrationMutation
} = sellersApiSlice;
