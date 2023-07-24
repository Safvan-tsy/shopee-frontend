import { PRODUCTS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page, keyword }) => ({
                url: PRODUCTS_URL,
                params: { page, keyword }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: ['Product']
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
            invalidatesTags: ['Product']
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
            invalidatesTags: ['Product']
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
            invalidatesTags: ['Product']
        }),
        getReviews: builder.query({
            query: (prodId) => ({
                url: `${PRODUCTS_URL}/${prodId}/review`,
            }),
            providesTags: ['Product']
        }),
        getTopProducts:builder.query({
            query: () => ({
                url:`${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor:5
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
    useGetReviewsQuery,
    useGetTopProductsQuery
} = productsApiSlice;