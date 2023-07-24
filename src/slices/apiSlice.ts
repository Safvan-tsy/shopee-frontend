import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

type BaseQuery = BaseQueryFn<FetchArgs>;
const baseQuery: BaseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
type TagTypes = 'Product' | 'Order' | 'User';
type EndpointsBuilder = Parameters<typeof createApi>[0]['endpoints'];

// // Create the endpoints object (update this with your actual endpoint definitions)
// const endpoints: EndpointsBuilder = (builder) => ({
//   // Add your endpoint definitions here
// });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints:(builder) => ({}),
});
