import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=> ({
                url:PRODUCTS_URL,
            }),
            keepUnusedDataFor:5,
            providesTags:['products']
        }),
        getProductDetail:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            providesTags:['products']
        }),
        createProduct:builder.mutation({
            query:({data,token})=>({
                url:`${PRODUCTS_URL}/`,
                method:'POST',  
                body:data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags:['products']
        }),
        updateProduct:builder.mutation({
            query:({data, token}) => ({
                url:`${PRODUCTS_URL}/${data.prodId}`,
                method:'PUT',
                body:data,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags:['products']
        })
    })
    
})

export const {useGetProductsQuery , useGetProductDetailQuery, useCreateProductMutation, useUpdateProductMutation} = productsApiSlice;