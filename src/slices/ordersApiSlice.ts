import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../utils/constants';
import { CartItem, OrderType } from '../types/product.types';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{status:string,order:any}, {data:OrderType,token:string}>({
      query: ({data,token}) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getOrderDetails: builder.query<{ data:{order:OrderType} }, { orderId: string; token: string }>({
      query: ({ orderId, token }) => ({
        url: `${ORDERS_URL}/${orderId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    updateOrderToPaid: builder.mutation<void, { orderId: string; token: string }>({
      query: ({ token, orderId }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateOrderToDelivered: builder.mutation<void, { orderId: string; token: string }>({
      query: ({ orderId, token }) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getMyOrders: builder.query<{ orders: OrderType[] }, {token:string}>({
      query: ({token}) => ({
        url: `${ORDERS_URL}/mine`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query<{ orders: any[] }, string>({
      query: (token) => ({
        url: `${ORDERS_URL}/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useUpdateOrderToDeliveredMutation,
  useUpdateOrderToPaidMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice;
