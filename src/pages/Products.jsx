import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProduct, handleUpdate, removeProd, setProducts } from '../redux/slice/ProductSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineModeEdit } from 'react-icons/md'
import Loading from '../common/Loading'
import CreateProd from '../components/CreateProd'
import { toast, ToastContainer } from 'react-toastify'

function Products({ open, setOpen, handleEditPro, setSinglePro, singlePro }) {
    const dispatch = useDispatch()
    const product = useSelector((state) => state?.getData);
    const [searchItem, setSearchItem] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])

 

    useEffect(() => {

        if (product?.products === null) {
            dispatch(allProduct())
        }
    }, [])

    const handleDelete = (id, index) => {
        const removeResponse = product?.products?.data?.filter((product, item) => product._id !== id)
        dispatch(removeProd(id))
        toast.success("Product Delete Successfully")
        dispatch(setProducts(removeResponse));
    }

    const handleEdit = (id) => {
        const singlevalue = product?.products?.data.find((item) => item._id === id);
        setOpen(true)
        setSinglePro(singlevalue);
    };

    // handle Search
    const searchProducts = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchItem(value);

        const filtered = product?.products?.data?.filter((item) => {
            return (
                item?.name?.toLowerCase().includes(value) ||
                item?.category?.toLowerCase().includes(value)
            );
        });

        setFilteredProducts(filtered);
    };

    return (
        <div className="container w-full p-4">
            <div className='py-3 p-5'>
                <input
                    value={searchItem}
                    onChange={searchProducts}
                    className='px-3 py-3 border rounded-lg w-full ' type="text" placeholder='Search product.......' />
            </div>

            {product.loading && <Loading />}
            <table className=" w-full table-auto border-collapse border border-gray-300">
                <ToastContainer/>

                <thead>
                    <tr className="bg-gray-100  w-full">
                        <th className="px-6 py-3 border border-gray-300 text-left text-sm font-medium text-gray-700 font-roboto">Name</th>
                        <th className="px-6 py-3 border border-gray-3  text-left text-sm font-medium text-gray-700 font-roboto">Category</th>
                        <th className="px-6 py-3 border border-gray-300   text-left text-sm font-medium text-gray-700 font-roboto">Price</th>
                        <th className="px-6 py-3 border border-gray-300   text-left text-sm font-medium text-gray-700 font-roboto">
                            Action
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {filteredProducts?.length > 0
                        ? filteredProducts.map((item, index) => (
                            <tr
                                key={index}
                                className={`odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-300`}
                            >
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{item?.name}</td>
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{item?.category}</td>
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{`$${item?.price?.toLocaleString()}`}</td>
                                <td className="px-6 py-4 border text-center grid grid-cols-2 justify-center border-gray-300 text-sm text-gray-900 font-semibold">
                                    <button onClick={() => handleDelete(item._id, index)} className="text-red-600 py-3">
                                        <AiOutlineDelete className="w-[20px] h-[20px]" />
                                    </button>
                                    <button className="text-green-700">
                                        <MdOutlineModeEdit
                                            onClick={() => {
                                                handleEdit(item._id);
                                            }}
                                            className="w-[20px] h-[20px]"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                        : product?.products?.data?.map((item, index) => (
                            <tr
                                key={index}
                                className={`odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-300`}
                            >
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{item?.name}</td>
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{item?.category}</td>
                                <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 font-semibold">{`$${item?.price?.toLocaleString()}`}</td>
                                <td className="px-6 py-4 border text-center grid grid-cols-2 justify-center border-gray-300 text-sm text-gray-900 font-semibold">
                                    <button onClick={() => handleDelete(item._id, index)} className="text-red-600 py-3">
                                        <AiOutlineDelete className="w-[20px] h-[20px]" />
                                    </button>
                                    <button className="text-green-700">
                                        <MdOutlineModeEdit
                                            onClick={() => {
                                                handleEdit(item._id);
                                            }}
                                            className="w-[20px] h-[20px]"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>

            </table>
            {open && <CreateProd setClose={setOpen} setEdit={handleEdit} singlePro={singlePro} />}
        </div>


    )
}

export default Products 