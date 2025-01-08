import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import createProducts, { handleUpdate } from '../redux/slice/ProductSlice';

const CreateProd = ({ setClose, singlePro }) => {
    const [addProduct, setAddProduct] = useState({
        name: "",
        price: "",
        category: ""
    });

    useEffect(() => {
        if (singlePro) {
            setAddProduct({
                name: singlePro.name || "",
                price: singlePro.price || "",
                category: singlePro.category || ""
            });
        }
    }, [singlePro]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (singlePro) {
       
            dispatch(handleUpdate({ id: singlePro._id, updatedProduct: addProduct }));
        } else {
        
            dispatch(createProducts(addProduct));
        }
        setClose(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                    {singlePro ? "Edit Product" : "Create Product"}
                </h2>

                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={addProduct.name}
                        onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        value={addProduct.category}
                        onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Category</option>
                        <option value="car">Car</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothes">Clothes</option>
                    </select>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        value={addProduct.price}
                        onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        {singlePro ? "Update Product" : "Create Product"}
                    </button>

                    <button
                        onClick={() => setClose(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProd;
