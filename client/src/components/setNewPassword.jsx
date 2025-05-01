import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmpassword: "", 
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add password reset logic here
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* Background gradient + image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #F8AD9D, #FF6666), url(${assets.login1})`,
                    backgroundBlendMode: "overlay",
                }}
            />

            {/* Form container */}
            <div className="relative z-10 bg-white rounded-lg shadow-xl p-12 w-full max-w-lg">
                <h1 className="text-5xl font-semibold text-center text-gray-800 mb-2">
                    Set New Password
                </h1>
                <p className="text-center text-gray-600">
                    Your new password must be different
                </p>
                <p className="text-center text-gray-600 mb-6">
                    from previously used passwords.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password Field */}
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2 text-[18px]">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">Must be at least 8 Characters</p>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-gray-700 mb-2 text-[18px]">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                                placeholder="Confirm Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <Link to = {"/passwordReset"}>
                    <button
                        type="submit"
                        className="w-full bg-[#ff9a9e] text-white py-2 rounded-md hover:bg-[#ff8589] transition-colors duration-200 cursor-pointer"
                    >
                        Reset Password
                    </button>
                    </Link>

                    <div className="flex items-center mt-3 gap-2 justify-center text-sm text-gray-500">
                        <FaArrowLeft />
                        <a href="/">Back to login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetNewPassword;
