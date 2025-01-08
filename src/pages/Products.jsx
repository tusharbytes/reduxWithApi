import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProduct, handleUpdate, removeProd } from '../redux/slice/ProductSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineModeEdit } from 'react-icons/md'
import Loading from '../common/Loading'
import CreateProd from '../components/CreateProd'

function Products({ open, setOpen }) {

    const [singlePro, setSinglePro] = useState(null)
    console.log(singlePro, "singlepRosds")



    const dispatch = useDispatch()

    const product = useSelector((state) => state?.getData)
    useEffect(() => {

        if(product?.products === null){
        dispatch(allProduct())
    }
    }, [])

    const handleDelete = (id) => {

        dispatch(removeProd(id))

    }
    const handleEdit = (id) => {
        const singlevalue = product?.products?.data.find((item) => item._id === id);
        setSinglePro(singlevalue);
    };




    return (
        <div className="container w-full p-4">

            {product.loading && <Loading />}
            <table className=" w-full table-auto border-collapse border border-gray-300">

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
                    {product?.products?.data?.map((item, index) => (
                        <tr
                            key={index}
                            className={`odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-300`}
                        >
                            <td className="px-6 py-4 border border-gray-300   text-sm text-gray-900 font-semibold">{item.name}</td>
                            <td className="px-6 py-4 border border-gray-300  text-sm text-gray-900 font-semibold">{item.category}</td>
                            <td className="px-6 py-4 border border-gray-300   text-sm text-gray-900 font-semibold">{`$${item.price.toLocaleString()}`}</td>
                            <td className="px-6 py-4 border text-center grid grid-cols-2 justify-center border-gray-300  text-sm text-gray-900 font-semibold">
                                <button onClick={() => handleDelete(item._id)} className='text-red-600 py-3'>
                                    <AiOutlineDelete className='w-[20px] h-[20px]' ></AiOutlineDelete>
                                </button>
                                <button className='text-green-700'>
                                    <MdOutlineModeEdit onClick={() => {
                                        handleEdit(item._id)
                                        setOpen(true)
                                    }} className='w-[20px] h-[20px]' ></MdOutlineModeEdit>
                                </button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {open && <CreateProd setClose={setOpen} singlePro={singlePro} />}
        </div>


    )
}

export default Products 