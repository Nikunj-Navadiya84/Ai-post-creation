import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import assets from '../assets/assets';
import { StoreContext } from '../Context/StoreContext';
import Menu from '../components/Menu';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const { post, setPost, setIsModal } = useContext(StoreContext);
  const [businesses, setBusinesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      } else {
        toast.error(`Failed to add business: ${response.data.message}`);
        console.error('Failed to add business:', response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Submit error:', error);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


    // Fetch business posts
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/post/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data.posts)) {
        setBusinesses(response.data.posts);
      } else {
        console.error('Invalid posts data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [setPost]);


  const toggleFavorite = (id) => {
    setPost((prevPosts) => {
      if (!Array.isArray(prevPosts)) return prevPosts;
      return prevPosts.map((post) =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
      );
    });
  };

  return (
    <div className="bg-white px-4 py-8 sm:px-6 md:px-10 lg:px-20">
      {/* Business Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Explore Business Posts</h2>
          <p className="text-gray-600 max-w-2xl mb-5">
            See how businesses turn ideas into engaging posts. Each one features unique branding elements like logos, names, and tailored visuals—all powered by AI.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white px-5 py-2 rounded-md font-semibold transition-colors mb-5 cursor-pointer"
        >
          Add Business
        </button>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mb-10">
        {businesses.map((biz, index) => (
          <div
            key={index}
            className="rounded-xl shadow border border-gray-200 flex items-center gap-5 p-5 relative"
            style={{ backgroundImage: `url(${assets.bg})`, backgroundSize: 'cover' }}
          >
            {biz.images && (
              <img
                src={biz.images.url}
                alt={biz.name}
                className="w-20 object-cover"
              />
            )}
            <span className="font-semibold text-base sm:text-lg text-gray-800">
              {biz.name}
            </span>

            <button
              onClick={() => setIsModal(true)}
              className="absolute top-3 right-3 bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white rounded-md p-1 cursor-pointer"
            >
              <FiPlus size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Recent Posts Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Recently Created Posts</h2>
      <p className="text-gray-600 mb-5 max-w-2xl">
        Here are your latest AI-generated posts, ready to download and share across your social media channels.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {post.slice(-4).map((post) => (
          <div key={post.id}>
            <div className="p-5 relative flex flex-col border border-gray-200 rounded-md bg-[#F2F2F2]">
              <div className="absolute items-center top-0 right-0 flex gap-1 px-1 bg-white rounded-md border border-gray-200">
                <button
                  className="text-yellow-400 cursor-pointer"
                  onClick={() => toggleFavorite(post.id)}
                >
                  {post.favorite ? <FaStar size={15} /> : <FaRegStar size={15} className="text-black" />}
                </button>
                <p>|</p>
                <Menu selectedPost={post} />
              </div>

              <img
                src={post.logoURL}
                alt={post.title}
                className="rounded-md h-40 sm:h-44 object-contain"
              />
            </div>

            <div className="flex-1 mt-3">
              <div className="text-md text-gray-800 font-semibold mb-1">{post.businessName}</div>
              <div className="text-sm text-gray-500 mb-2">{post.postType}</div>
            </div>
          </div>
        ))}
      </div>



      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 backdrop-brightness-40 flex justify-center items-center z-50 px-2 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="relative z-10 bg-white rounded-lg shadow-xl w-11/12 sm:w-full max-w-md sm:max-w-xl sm:mx-auto sm:my-10 sm:rounded-lg"
            >
              {/* Close */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 bg-white rounded-full w-7 h-7 text-lg font-bold text-red-400 cursor-pointer"
              >
                &times;
              </button>

              {/* Header */}
              <div className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] rounded-t-md py-4">
                <h1 className="text-2xl font-semibold text-white text-center">Collect Information</h1>
              </div>

              {/* Form */}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
