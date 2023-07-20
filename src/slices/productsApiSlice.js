import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({page,limit}) => ({
                url: PRODUCTS_URL,
                params:{
                    page,
                    limit
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['products']
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: ['products']
        }),
        createProduct: builder.mutation({
            query: ({ data, token }) => ({
                url: `${PRODUCTS_URL}/`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: builder.mutation({
            query: ({ data, token }) => ({
                url: `${PRODUCTS_URL}/${data.prodId}`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['products']
        }),
        uploadProdImage: builder.mutation({
            query: ({ formData, token }) => ({
                url: `${PRODUCTS_URL}/image`,
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
        }),
        deleteProduct: builder.mutation({
            query: ({ prodId, token }) => ({
                url: `${PRODUCTS_URL}/${prodId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        createReview: builder.mutation({
            query: ({ data, token }) => ({
                url: `${PRODUCTS_URL}/${data.prodId}/review`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Products'],
        }),
        getReviews: builder.query({
            query: (prodId) => ({
                url: `${PRODUCTS_URL}/${prodId}/review`,
            }),
            providesTags: ['products']
        })
    })

})

export const {
    useGetProductsQuery,
    useUploadProdImageMutation,
    useGetProductDetailQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetReviewsQuery
} = productsApiSlice;