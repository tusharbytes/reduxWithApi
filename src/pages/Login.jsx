import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile, userLogin } from '../redux/slice/LogSlice';
import { toast, ToastContainer } from 'react-toastify';
import { allProduct } from '../redux/slice/ProductSlice';


const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()
    const handleLog = (e) => {
        e.preventDefault()
        if (formData.email && formData.password) {
            dispatch(userLogin(formData))

            dispatch(allProduct())
            navigate("/dashboard")

            setFormData({
                email: "",
                password: ""
            })

        } else {
            toast.error("please fill Correct Email and password")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-sm">
                <ToastContainer />
                <h1 className="text-2xl font-semibold text-center text-gray-200 mb-6">Log In</h1>

                <form onSubmit={handleLog}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1"  >
                            Email address
                        </label>
                        <input
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1"  >
                            Password
                        </label>
                        <input
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            type="password"

                            placeholder="Enter your password"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Loged In →
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Don't have an account?{' '}
                    <Link to={"/signup"} className="text-blue-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
