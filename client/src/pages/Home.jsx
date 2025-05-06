import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import assets from '../assets/assets';

const pizzaPost = 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600';
const energyPost = 'https://images.pexels.com/photos/253096/pexels-photo-253096.jpeg?auto=compress&cs=tinysrgb&w=600';
const pizzaPost2 = 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600';
const businessPost = 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600';

const initialBusinesses = [
  { id: 1, name: 'Pizzeria Hot & Tasty', logo: assets.logo2 },
  { id: 2, name: 'Kano Interiors & Furniture', logo: assets.logo1 },
  { id: 3, name: 'Pizzeria Hot & Tasty', logo: assets.logo2 },
  { id: 4, name: 'Kano Interiors & Furniture', logo: assets.logo1 },
];

const initialPosts = [
  {
    id: 1,
    image: pizzaPost,
    title: 'Untitled Post',
    size: '1080 × 1080 px Instagram post',
    favorite: false,
  },
  {
    id: 2,
    image: energyPost,
    title: 'Untitled Post',
    size: '1584 × 396 px Linkedin banner',
    favorite: false,
  },
  {
    id: 3,
    image: pizzaPost2,
    title: 'Untitled Post',
    size: '1080 × 1080 px Instagram post',
    favorite: false,
  },
  {
    id: 4,
    image: businessPost,
    title: 'Untitled Post',
    size: '1584 × 396 px Linkedin banner',
    favorite: false,
  },
];

const Home = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newBizAddress, setNewBizAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [logoURL, setLogoURL] = useState('');

  const toggleFavorite = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
      )
    );
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
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 md:px-10 lg:px-20">

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-40 flex justify-center items-center z-50 px-2">
          <div className="relative z-10 bg-white rounded-lg shadow-xl w-11/12 sm:w-full max-w-md">

            {/* Close Button */}
            <div className='flex items-center justify-center'>
           <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 bg-white rounded-full w-7 h-7 text-lg font-bold text-red-400 cursor-pointer"
            >
              &times;
            </button>
            </div>
           
            {/* Header */}
            <div className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] rounded-t-md py-4">
              <h1 className="text-2xl font-semibold text-white text-center">
                Collect Information
              </h1>
            </div>

            {/* Form */}
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
                      className="bg-[#ff7e7e] hover:bg-[#ff5e5e] text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200"
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
                className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white py-2 w-full rounded-md transition-colors duration-200"
              >
                Save Business Information
              </button>
            </form>
          </div>
        </div>
      )}



      {/* Business Section */}
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
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="rounded-xl shadow border border-gray-200 flex items-center gap-5 p-5 relative"
            style={{
              backgroundImage: `url(${assets.bg})`,
              backgroundSize: 'cover',
            }}
          >
            {biz.logo && (
              <img
                src={biz.logo}
                alt={biz.name}
                className="w-20 object-cover"
              />
            )}
            <span className="font-semibold text-base sm:text-lg text-gray-800">
              {biz.name}
            </span>
            <button className="absolute top-3 right-3 bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white rounded-md p-1 cursor-pointer">
              <FiPlus size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Recently Created Posts */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Recently Created Posts</h2>
      <p className="text-gray-600 mb-5 max-w-2xl">
        Here are your latest AI-generated posts, ready to download and share across your social media channels. Stay consistent and keep your audience engaged effortlessly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id}>
            <div className="p-5 relative flex flex-col border border-gray-200 rounded-md bg-[#F2F2F2]">
              <label className="relative cursor-pointer w-5 h-5">
                <input type="checkbox" className="peer absolute opacity-0 w-5 h-5 z-10 cursor-pointer bg-white" />
                <span className="w-5 h-5 block rounded border border-gray-400 bg-white peer-checked:bg-gradient-to-b peer-checked:from-[#ff9a9e] peer-checked:to-[#ff6666] peer-checked:border-transparent transition-all duration-200"></span>
                <svg className="absolute top-[2px] left-[2px] w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </label>

              <div className='absolute top-3 right-3 flex gap-2 bg-white rounded-md p-1 border border-gray-200'>
                <button
                  className="text-yellow-400 cursor-pointer"
                  onClick={() => toggleFavorite(post.id)}
                >
                  {post.favorite ? <FaStar size={22} /> : <FaRegStar size={22} className="text-black" />}
                </button>
                <button className="text-gray-400 hover:text-gray-700 cursor-pointer">
                  <FiMoreHorizontal size={22} />
                </button>
              </div>
              <img src={post.image} alt={post.title} className="rounded-md h-40 sm:h-44 object-contain" />
            </div>
            <div className="flex-1 mt-3 ">
              <div className="text-md text-gray-800 mb-1">{post.title}</div>
              <div className="text-sm text-gray-500 mb-2">{post.size}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
