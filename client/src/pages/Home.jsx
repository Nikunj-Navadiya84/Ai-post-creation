import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi';

// Placeholder images (replace with your assets)
const pizzaLogo = 'https://img.icons8.com/color/96/000000/pizza.png';
const kanoLogo = 'https://img.icons8.com/color/96/000000/sofa.png';
const pizzaPost = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80';
const energyPost = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
const pizzaPost2 = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80';
const businessPost = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80';

const businesses = [
  { id: 1, name: 'Pizzeria Hot & Tasty', logo: pizzaLogo },
  { id: 2, name: 'Kano Interiors & Furniture', logo: kanoLogo },
  { id: 3, name: 'Pizzeria Hot & Tasty', logo: pizzaLogo },
  { id: 4, name: 'Kano Interiors & Furniture', logo: kanoLogo },
];

const posts = [
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
    favorite: true,
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
    favorite: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-12 lg:px-24">
      {/* Explore Business Posts */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">Explore Business Posts</h2>
        <button className="bg-[#ff9a9e] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#ff8589] transition-colors">Add Business</button>
      </div>
      <p className="text-gray-600 mb-6 max-w-2xl">
        See how businesses turn ideas into engaging posts. Each one features unique branding elements like logos, names, and tailored visuals—all powered by AI.
      </p>
      <div className="flex gap-6 mb-12 overflow-x-auto pb-2">
        {businesses.map((biz) => (
          <div key={biz.id} className="bg-gray-50 rounded-xl shadow border flex items-center gap-4 px-8 py-6 min-w-[270px] relative">
            <img src={biz.logo} alt={biz.name} className="w-16 h-16 object-contain rounded-full border" />
            <span className="font-semibold text-lg text-gray-800">{biz.name}</span>
            <button className="absolute top-3 right-3 bg-[#ff9a9e] text-white rounded-full p-1 hover:bg-[#ff8589]">
              <FiPlus size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Recently Created Posts */}
      <h2 className="text-3xl font-bold mb-2">Recently Created Posts</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Here are your latest AI-generated posts, ready to download and share across your social media channels. Stay consistent and keep your audience engaged effortlessly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow p-4 relative flex flex-col">
            <input type="checkbox" className="absolute top-3 left-3 w-4 h-4 accent-[#ff9a9e]" />
            <button className="absolute top-3 right-10 text-yellow-400">
              {post.favorite ? <FaStar size={22} /> : <FaRegStar size={22} />}
            </button>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
              <FiMoreHorizontal size={22} />
            </button>
            <img src={post.image} alt={post.title} className="rounded-md h-44 object-cover mb-3" />
            <div className="flex-1">
              <div className="font-semibold text-md text-gray-800 mb-1">{post.title}</div>
              <div className="text-xs text-gray-500 mb-2">{post.size}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
    
