import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from "axios";

const url = "http://localhost:5000/api/";
const token = Cookies.get("token")

const allProduct = createAsyncThunk("allProduct", async () => {
    const response = await axios.get(`${url}get/products`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    },)

    return response.data
})

const createProducts = createAsyncThunk("createProducts", async (payload) => {
    const response = await axios.post(`${url}create/product`, payload, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    },)
    console.log(response.data)

    return response.data
})

const removeProd = createAsyncThunk("removePro", async (id) => {

    const response = await axios.delete(`${url}delete/product/${id}`, {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    },)
    return response.data
})

const handleUpdate = createAsyncThunk("updateProduct", async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${url}update/product/${id}`,
            updatedProduct,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return rejectWithValue(error.response?.data || error.message);
    }
});



const getPro = createSlice({
    name: "getPro",
    initialState: ({
        products: null,
        loading: null,
        error: null,
    }),
    reducers: {
        setProducts: (state, action) => {
            state.products.data = action.payload

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allProduct.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(allProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.error = null
            })
            .addCase(allProduct.rejected, (state) => {
                state.loading = false
                state.error = null
            })
            // create products
            .addCase(createProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products?.data.push(action.payload.data)
                state.error = null;
            })

            .addCase(createProducts.rejected, (state) => {
                state.loading = false

                state.error = null
            })


            // deleteproduct


            .addCase(removeProd.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeProd.fulfilled, (state, action) => {
                state.loading = false
                state.products.data = state.products.data?.filter(product => product._id !== action.payload);

            })
            .addCase(removeProd.rejected, (state) => {
                state.loading = false
                state.error = null
            })
            //update products
            .addCase(handleUpdate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload.product;
                state.products.data = state.products.data.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                );

            })

            .addCase(handleUpdate.rejected, (state) => {
                state.loading = false
                state.error = null
            })


    }
})
export { allProduct, createProducts, removeProd, handleUpdate };
export const { setProducts } = getPro.actions
export default getPro.reducer;