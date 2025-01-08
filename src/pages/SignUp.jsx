import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { userSignup } from '../redux/slice/LogSlice';

const Signup = () => {

    const [formData, setFormData] = useState({
        first_name: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.first_name && formData.email && formData.password) {

            toast.success("User Sign Up Successfully")
            dispatch(userSignup(formData))
            setFormData({
                first_name: "",
                email: "",
                password: ""
            })

        } else {
            toast.error("User Not Register")
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <ToastContainer />
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-200 mb-6">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            type="text"

                            placeholder="Enter your first name"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email address
                        </label>
                        <input
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
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
                        Sign Up →
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link to={"/login"} className="text-blue-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
