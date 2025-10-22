
import { apiSlice } from "../../app/api/apiSlice"
export const authApiSlice = apiSlice.injectEndpoints({       
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: {...credentials},
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: {...credentials},
            }),
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
        // AddProduct: builder.mutation({
        //     query:(FormData)=>({
        //         url:"/product",
        //         method:"post",
        //         body:FormData,
        //     })
        // })
    }),
})
export const { useRegisterMutation } = authApiSlice;
export const { useLoginMutation } = authApiSlice;
export const { useSendLogoutMutation } = authApiSlice;
// export const {useAddProductMutation}= authApiSlice;