import React, { useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import assets from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";

const PostReady = () => {
    const location = useLocation();
    const selectedPost = location.state?.selectedPost;
    const {
        logoURL,
        selectedImage, setPost,
        postType, setPostType,
        tone, setTone,
        postDescription, setPostDescription,
        businessName, setBusinessName,
        editingPost,
        handleRegeneratePost,
        handleImageChangepost,
    } = useContext(StoreContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const handleSubmitpost = (e) => {
        e.preventDefault();

        const postData = {
            id: editingPost?.id || Date.now(),
            postType,
            tone,
            logoURL,
            postDescription,
            businessName,
            favorite: editingPost?.favorite || false,
        };

        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        if (editingPost) {
            posts = posts.map(p => p.id === editingPost.id ? postData : p);
        } else {
            posts.push(postData);
        }
        localStorage.setItem("posts", JSON.stringify(posts));
        setPost(posts);
    };

    useEffect(() => {
        const storedPosts = localStorage.getItem("posts");
        if (storedPosts) {
            setPost(JSON.parse(storedPosts));
        }
    }, []);


    useEffect(() => {
        if (selectedPost) {
            handleRegeneratePost(selectedPost);
        }
    }, [selectedPost]);

    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };



    if (!selectedPost) {
        return <div>No post selected.</div>;
    }

    return (
        <div className="bg-white px-4 py-8 sm:px-6 md:px-10 lg:px-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">Your post is ready!</h2>
            <div className="flex grid-cols-2 gap-15 flex-col lg:flex-row">
                {/* Preview Section */}
                <div className="w-full ">

                    <div className="p-5  flex flex-col h-124 items-center justify-center border border-gray-200 rounded-md bg-[#F2F2F2]">
                        {logoURL ? (
                            <img
                                src={logoURL}
                                alt="logo"
                                className="rounded-md w-full h-120.5 object-contain"
                                onClick={() => openModal(logoURL)}
                            />
                        ) : null}
                    </div>


                    <div className="flex-1 mt-3">
                        <div className="text-md text-gray-800 font-semibold mb-1">{businessName}</div>
                        <div className="text-sm text-gray-500 mb-2">{postType}</div>
                    </div>

                    <div className="flex gap-5">
                        <button className="w-full bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] cursor-pointer rounded text-md text-white py-2">
                            Download
                        </button>
                        <button className="w-full border rounded cursor-pointer py-2">
                            Back to Home
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full ">
                    <form onSubmit={handleSubmitpost}>

                        {/* Post Type */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-lg font-semibold">Post Details</label>
                            <select
                                value={postType}
                                onChange={(e) => setPostType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                required
                            >
                                <option value="">Post / Banner Type</option>
                                <option value="Post (1080*1080)">Post (1080*1080)</option>
                                <option value="Banner (1584*396)">Banner (1584*396)</option>
                            </select>
                        </div>

                        {/* Tone */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-lg font-semibold">Tone Selection</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                required
                            >
                                <option value="custom">Custom</option>
                                <option value="formal">Formal</option>
                                <option value="casual">Casual</option>
                                <option value="funny">Funny</option>
                            </select>
                        </div>

                        {/* Business Name */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-lg font-semibold">Business Name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                placeholder="Enter your business name"
                                required
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-1 text-lg font-semibold">Logo / Image</label>
                            <div className="border border-gray-300 border-dashed rounded-md p-3 text-center text-sm">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={assets.upload}
                                        alt="upload"
                                        className="w-10 h-10 mb-2 opacity-70"
                                    />
                                    <p className="text-gray-600 mb-2 text-sm">
                                        Drag and drop a logo or image to upload
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChangepost}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200 text-sm"
                                    >
                                        Upload
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">supported formats: JPG, PNG</p>
                                </div>
                                {/* {selectedImage && (
                                    <p className="mt-2 text-green-600 text-sm whitespace-normal break-words max-w-full">
                                        {selectedImage.name}
                                    </p>
                                )} */}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1 text-lg font-semibold">Post / Banner Description</label>
                            <textarea
                                value={postDescription}
                                onChange={(e) => setPostDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                placeholder="Text here..."
                                required
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            type="submit"
                            className={`text-white py-2 w-full rounded-md transition-colors duration-200 ${businessName && logoURL && postDescription
                                ? 'bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            disabled={!businessName || !logoURL || !postDescription}
                        >
                            Generate
                        </button>
                    </form>
                </div>
            </div>

             {/* Modal for full-screen image */}
             {isModalOpen && (
                <div className="fixed inset-0 backdrop-brightness-40 flex justify-center items-center z-50">
                    <div className="relative max-w-full max-h-full p-20 border bg-gray-100">
                        <img
                            src={modalImage}
                            alt="Full screen"
                            className="object-contain max-w-full max-h-full"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute w-10 h-10 top-1 right-1 p-2 text-white bg-red-400 rounded-full cursor-pointer"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostReady;
