import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import assets from "../assets/assets";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        // Optional: Add validation for password match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Add sign-up logic here
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

            {/* Signup Form */}
            <div className="relative z-10 bg-white rounded-lg shadow-xl p-10 w-full max-w-lg">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2">
                    Create Account
                </h1>
                <p className="text-center text-gray-600 mb-5 text-sm">
                    Please enter your details to sign up.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
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

                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
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

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 border-gray-300 rounded mr-2 cursor-pointer"
                            />
                            <p>
                                By signing up, you accept our{" "}
                                <span className="text-red-400">Terms & Conditions</span> and{" "}
                                <span className="text-red-400">Privacy Policy</span>
                            </p>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ff9a9e] text-white py-2 rounded-md hover:bg-[#ff8589] transition-colors duration-200 cursor-pointer mb-3"
                    >
                        Sign Up
                    </button>

                    <div className="relative flex items-center justify-center text-sm text-gray-500 mb-3">
                        <div className="border-t border-gray-300 flex-grow"></div>
                        <span className="px-4">or continue with</span>
                        <div className="border-t border-gray-300 flex-grow"></div>
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                        <FcGoogle size={20} />
                        <span>Sign up with Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
