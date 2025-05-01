import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

const CheckYourEmail = () => {
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

            {/* Forgot Password Form */}
            <div className="relative z-10 bg-white rounded-lg shadow-xl p-12 w-full max-w-lg">
                <h1 className="text-5xl font-semibold text-center text-gray-800 mb-2">
                    Check Your Email
                </h1>
                <p className="text-center text-gray-600">
                    We sent a psssword reset link to
                </p>
                <p className="text-center text-gray-600 mb-6">abc@gmail.com</p>

                <Link to={'/setNewPassword'}>
                    <button
                        type="submit"
                        className="w-full bg-[#ff9a9e] hover:bg-[#ff8589]  text-white py-2 rounded-md transition duration-200 cursor-pointer"
                    >
                        Open Email App
                    </button>
                </Link>

                <p className="flex text-gray-400 text-sm items-center justify-center mt-3">Didn’t receive the email? <span className="text-red-400">Click to resend</span></p>

                <div className="flex items-center mt-3 gap-2 justify-center text-sm text-gray-500">
                    <FaArrowLeft />
                    <a href="/">Back to login</a>
                </div>
            </div>
        </div>
    );
}

export default CheckYourEmail