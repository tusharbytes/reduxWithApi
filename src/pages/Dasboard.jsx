import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slice/LogSlice";
import { FaRegUserCircle } from "react-icons/fa";
import Products from "./Products";
import CreateProd from "../components/CreateProd";
import Settings from "./Settings";

function Dashboard() {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.sign);
    console.log(data, "data")
    useEffect(() => {
        if (data?.userData === null) {
            dispatch(getProfile());
        }
    }, []);

    const handleLogOut = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-[#1B2432] text-white p-5">
                <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
                    <FaRegUserCircle /> {data?.userData?.data?.first_name || 'Guest'}
                </h1>
                <nav className="mt-10 grid grid-cols-1">
                    <Link to="/dashboard" className="py-2 hover:bg-blue-700 cursor-pointer w-full">Home</Link>
                    <Link to="/analytics" className="py-2 hover:bg-blue-700 cursor-pointer">Analytics</Link>
                    <Link to="/product" className="py-2 hover:bg-blue-700 cursor-pointer">Product</Link>
                    <Link to="/settings" className="py-2 hover:bg-blue-700 cursor-pointer">Settings</Link>
                </nav>
                <div className="mt-auto flex justify-center items-baseline">
                    <button
                        onClick={handleLogOut}
                        className="bg-red-600 hover:bg-red-800 w-full px-3 py-3 rounded-xl">LogOut</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Top Navbar */}
                <div className="flex justify-between items-center">

                    <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
                    {!open && <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={() => setOpen(true)}>Add</button>}
                    {open && <CreateProd setClose={setOpen} />}
                </div>

                {/* Dashboard Cards */}
                <div className="flex justify-center mt-8">
                    <div className="w-full md:w-4/5">
                        <Products open={open} setOpen={setOpen} />
               

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
