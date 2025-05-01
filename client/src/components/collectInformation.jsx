import React, { useState } from "react";
import assets from "../assets/assets";

const CollectInformation = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setSelectedImage(file);
        } else {
            alert("Only JPG and PNG files are supported.");
        }
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

            {/* Form */}
            <div className="relative z-10 bg-white rounded-lg shadow-xl p-12 w-full max-w-lg">
                <h1 className="text-5xl font-semibold text-center text-gray-800 mb-2">
                    Collect Information
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Add your business details to continue.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-[18px]">Business Name</label>
                        <input
                            type="text"
                            name="businessname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-[18px]">Business Address</label>
                        <textarea
                            name="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                            placeholder="Address"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 text-[18px]">Logo / Banner Image</label>
                        <div className="border border-gray-300 border-dashed rounded-md p-6 text-center">
                            <div className="flex flex-col items-center">
                                <img
                                    src={assets.upload}
                                    alt="upload"
                                    className="w-12 h-12 mb-2 opacity-70"
                                />
                                <p className="text-gray-600 mb-2">
                                    Drag and drop a logo or image to upload
                                </p>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-[#ff9a9e] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#ff8589] transition-colors duration-200"
                                >
                                    Upload
                                </label>
                                <p className="text-sm text-gray-500 mt-2">supported formats: JPG, PNG</p>
                            </div>
                            {selectedImage && (
                                <p className="mt-2 text-green-600">Selected: {selectedImage.name}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ff9a9e] text-white py-2 rounded-md hover:bg-[#ff8589] transition-colors duration-200 cursor-pointer"
                    >
                        Save Business Information
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CollectInformation;
