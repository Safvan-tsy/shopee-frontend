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
        getOrderDetails:builder.query({
            query:(order) => ({
                url:`${ORDERS_URL}/${order.orderId}`,
                headers: {
                    Authorization: `Bearer ${order.token}`,
                },
            }),
            keepUnusedDataFor:5
        })
    })
})


export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice