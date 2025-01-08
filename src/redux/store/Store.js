import { configureStore } from "@reduxjs/toolkit";
import register from '../slice/LogSlice';
import getPro from "../slice/ProductSlice"

const store = configureStore({
    reducer: {
        sign: register,
        getData: getPro,
    },
});

export default store;
