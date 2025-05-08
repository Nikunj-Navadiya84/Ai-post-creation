import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";

const CollectInformation = () => {
    const navigate = useNavigate();
    const { isModalOpen, setIsModalOpen, businesses, setBusinesses, newBizName, setNewBizName, newBizAddress, setNewBizAddress, logoURL, setLogoURL, selectedImage, setSelectedImage, } = useContext(StoreContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newBizName && logoURL) {
            const newBusiness = {
                id: businesses.length + 1,
                name: newBizName,
                address: newBizAddress,
                logo: logoURL,
            };
            setBusinesses([...businesses, newBusiness]);
            setNewBizName('');
            setNewBizAddress('');
            setSelectedImage(null);
            setLogoURL('');
            setIsModalOpen(false);
            navigate("/home");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoURL(reader.result);
            };
            reader.readAsDataURL(file);
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

                <form onSubmit={handleSubmit} className='p-6'>

                    {/* Business Name */}
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 text-sm">Business Name</label>
                        <input
                            type="text"
                            value={newBizName}
                            onChange={(e) => setNewBizName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Name"
                            required
                        />
                    </div>

                    {/* Business Address */}
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1 text-sm">Business Address</label>
                        <textarea
                            value={newBizAddress}
                            onChange={(e) => setNewBizAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                            placeholder="Address"
                            required
                        />
                    </div>

                    {/* Logo / Banner Image */}
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
                                    Drag and drop an logo or image to upload
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
                                    className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200"
                                >
                                    Upload
                                </label>
                                <p className="text-sm text-gray-500 mt-2">supported formats: JPG, PNG</p>
                            </div>
                            {selectedImage && (
                                <p className="mt-2 text-green-600 text-sm">Selected: {selectedImage.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                type="submit"
                className={`text-white py-2 w-full rounded-md transition-colors duration-200 ${newBizName && logoURL && newBizAddress
                  ? 'bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
                  }`}
                disabled={!newBizName || !logoURL || !newBizAddress}
              >
                Save Business Information
              </button>
                </form>
            </div>
        </div>
    );
};

export default CollectInformation;
