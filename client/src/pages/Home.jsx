import React, { useContext } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import assets from '../assets/assets';
import { StoreContext } from '../Context/StoreContext';
import Menu from '../components/Menu';


const Home = () => {

  const { setIsModalOpen, businesses, post, setPost, setIsModal } = useContext(StoreContext);

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
            style={{ backgroundImage: `url(${assets.bg})`, backgroundSize: 'cover' }}
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

            <button
              onClick={() => setIsModal(true)}
              className="absolute top-3 right-3 bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white rounded-md p-1 cursor-pointer"
            >
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
        {post.slice(-4).map((post) => (
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

                {/* ✅ Updated: Using Menu component */}
                <Menu />
              </div>

              <img src={post.logoURL} alt={post.title} className="rounded-md h-40 sm:h-44 object-contain" />
            </div>

            <div className="flex-1 mt-3">
              <div className="text-md text-gray-800 font-semibold mb-1">{post.businessName}</div>
              <div className="text-sm text-gray-500 mb-2">{post.postType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
