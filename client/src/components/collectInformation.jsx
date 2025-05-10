import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

const CollectInformation = () => {
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');


    // Submit new business post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', businessName);
            formData.append('address', businessAddress);
            formData.append('image', logoFile);

            const response = await axios.post(
                'http://localhost:4000/api/post/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success('Business added successfully!');
                setIsModalOpen(false);
                setBusinessName('');
                setBusinessAddress('');
                setLogoFile(null);
                setPreviewImage('');
                fetchPosts();
                navigate('/');
            } else {
                toast.error(`Failed to add business: ${response.data.message}`);
                console.error('Failed to add business:', response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error('Submit error:', error);
        }
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #F8AD9D, #FF6666), url(${assets.login1})`,
                    backgroundBlendMode: "overlay",
                }}
            />

            <div className="relative z-10 bg-white rounded-lg shadow-xl p-10 w-full max-w-lg">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2">
                    Collect Information
                </h1>
                <p className="text-center text-gray-600 mb-5 text-sm">
                    Add your business details to continue.
                </p>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Business Name */}
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 text-sm">Business Name</label>
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Name"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 text-sm">Business Address</label>
                        <textarea
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Address"
                            required
                        />
                    </div>

                    {/* Upload Image */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1 text-sm">Logo / Banner Image</label>
                        <div className="border border-gray-300 border-dashed rounded-md p-6 text-center text-sm">
                            <div className="flex flex-col items-center">
                                <img
                                    src={assets.upload}
                                    alt="upload"
                                    className="w-10 h-10 mb-2 opacity-70"
                                />
                                <p className="text-gray-600 mb-2 text-sm">
                                    Drag and drop or browse to upload
                                </p>

                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                    id="file-upload"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setLogoFile(file);
                                        setPreviewImage(URL.createObjectURL(file));
                                    }}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200"
                                >
                                    Upload
                                </label>
                                <p className="text-sm text-gray-500 mt-2">supported formats: JPG, PNG</p>

                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full max-h-48 object-contain rounded-lg shadow-md"
                                    />
                                )}


                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="text-white py-2 w-full rounded-md transition-colors duration-200 bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] cursor-pointer"
                    >
                        Save Business Information
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CollectInformation;
