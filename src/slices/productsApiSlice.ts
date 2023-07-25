import { PRODUCTS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";
import { ProductType } from "../types/product.types";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{data:{products:ProductType[]},pages:number,page:number }, { page: number; keyword: string }>({
      query: ({ page, keyword }) => ({
        url: PRODUCTS_URL,
        params: { page, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getProductDetail: builder.query<{ product: ProductType }, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<void, { data: any; token: string }>({
      query: ({ data, token }) => ({
        url: `${PRODUCTS_URL}/`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, { data: any; token: string }>({
      query: ({ data, token }) => ({
        url: `${PRODUCTS_URL}/${data.prodId}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProdImage: builder.mutation<void, { formData: FormData; token: string }>({
      query: ({ formData, token }) => ({
        url: `${PRODUCTS_URL}/image`,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteProduct: builder.mutation<void, { prodId: string; token: string }>({
      query: ({ prodId, token }) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createReview: builder.mutation<void, { data: any; token: string }>({
      query: ({ data, token }) => ({
        url: `${PRODUCTS_URL}/${data.prodId}/review`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    getReviews: builder.query<{ reviews: any[] }, string>({
      query: (prodId) => ({
        url: `${PRODUCTS_URL}/${prodId}/review`,
      }),
      providesTags: ['Product'],
    }),
    getTopProducts: builder.query<{ products: ProductType[] }, void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUploadProdImageMutation,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetTopProductsQuery,
} = productsApiSlice;