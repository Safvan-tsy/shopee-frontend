import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
                headers: {
                    Authorization: `Bearer ${order.token}`,
                },
            })
        }),
        getOrderDetails: builder.query({
            query: (order) => ({
                url: `${ORDERS_URL}/${order.orderId}`,
                headers: {
                    Authorization: `Bearer ${order.token}`,
                },
            }),
            keepUnusedDataFor: 5
        }),
        updateOrderToPaid: builder.mutation({
            query: ({token,orderId}) => ({
              url: `${ORDERS_URL}/${orderId}/pay`,
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          }),
        updateOrderToDelivered: builder.mutation({
            query: ({orderId, token}) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })
})


export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useUpdateOrderToDeliveredMutation,
     useUpdateOrderToPaidMutation
} = ordersApiSlice