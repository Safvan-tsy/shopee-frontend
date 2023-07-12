import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=> ({
                url:PRODUCTS_URL,
            }),
            keepUnusedDataFor:5
        }),
        getProductDetail:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
            })
        }),
        createProduct:builder.mutation({
            query:({data,token})=>({
                url:PRODUCTS_URL,
                method:'POST',  
                body:data,
                headers:{
                    Authorization:`${token}`
                }
            })
        })
    })
    
})

export const {useGetProductsQuery , useGetProductDetailQuery, useCreateProductMutation} = productsApiSlice;