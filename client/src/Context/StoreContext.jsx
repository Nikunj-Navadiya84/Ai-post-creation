import { createContext, useState } from "react";
export const StoreContext = createContext();
import assets from '../assets/assets';


export const ShopContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newBizAddress, setNewBizAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [logoURL, setLogoURL] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const [post, setPost] = useState([]);
  const [postType, setPostType] = useState('');
  const [tone, setTone] = useState('');
  const [postDescription, setPostDescription] = useState('');


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



  const handleImageChangepost = (e) => {
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

  const handleSubmitpost = (e) => {
    e.preventDefault();

    const postData = {
      id: Date.now(),
      postType,
      tone,
      logoURL,
      postDescription,
      businessName: newBizName,
      favorite: false,
    };

    setPost((prevPosts) => [...prevPosts, postData]);

    console.log('Submitted Post Data:', postData);
    setPostType('');
    setTone('custom');
    setSelectedImage(null);
    setLogoURL('');
    setPostDescription('');
    setIsModal(false);
  };

  const handleCloseModalpost = () => {
    setIsModal(false);
  };

  const contextValue = {
    isModalOpen, setIsModalOpen,
    businesses, setBusinesses,
    newBizName, setNewBizName,
    newBizAddress, setNewBizAddress,
    logoURL, setLogoURL,
    selectedImage, setSelectedImage,
    post, setPost,
    setIsModal

  };


  return (
    <StoreContext.Provider value={contextValue}>
      {children}

      {isModalOpen && (
          <div className="fixed inset-0 backdrop-brightness-40 flex justify-center items-center lg:justify-start lg:items-start lg:flex-none z-50 px-2 overflow-y-auto">

          <div className="relative z-10 bg-white rounded-lg shadow-xl w-11/12 sm:w-full max-w-md sm:max-w-xl sm:mx-auto sm:my-10 sm:rounded-lg sm:h-auto">

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
                      className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200"
                    >
                      Upload
                    </label>
                    <p className="text-sm text-gray-500 mt-2">supported formats: JPG, PNG</p>
                  </div>
                  {selectedImage && (
                    <p className="mt-2 text-green-600 text-sm whitespace-normal break-words max-w-full">
                    {selectedImage.name}
                  </p>
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

      {isModal && (
        <div className="fixed inset-0 backdrop-brightness-40 flex justify-center items-center lg:justify-start lg:items-start lg:flex-none z-50 px-2 overflow-y-auto">

          <div className="relative z-10 bg-white rounded-lg shadow-xl w-11/12 sm:w-full max-w-md sm:max-w-xl sm:mx-auto sm:my-10 sm:rounded-lg sm:h-auto">
            {/* Close Button */}
            <div className='flex items-center justify-center'>
              <button
                onClick={handleCloseModalpost}
                className="absolute top-3 right-4 bg-white rounded-full w-7 h-7 text-lg font-bold text-red-400 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] rounded-t-md py-4">
              <h1 className="text-2xl font-semibold text-white text-center">
                Generate Post
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitpost} className='p-6'>

              {/* Post Details Dropdown */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1 text-sm">Post Details</label>
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  required
                >
                  <option value="">Post / Banner Type</option>
                  <option value="post">Post</option>
                  <option value="banner">Banner</option>
                </select>
              </div>

              {/* Tone Selection Dropdown */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1 text-sm">Tone Selection</label>
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

              {/* Business Name Input */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1 text-sm">Business Name</label>
                <input
                  type="text"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                  placeholder="Enter your business name"
                  required
                />
              </div>

              {/* Logo / Image */}
              <div className="mb-3">
                <label className="block text-gray-700 mb-1 text-sm">Logo / Image</label>
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
                  {selectedImage && (
                    <p className="mt-2 text-green-600 text-sm whitespace-normal break-words max-w-full">{selectedImage.name}</p>
                  )}
                </div>
              </div>

              {/* Post / Banner Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Post / Banner Description</label>
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
                className="bg-gradient-to-b from-[#ff9a9e] to-[#ff6666] text-white py-2 w-full rounded-md transition-colors duration-200"
                disabled={!newBizName || !logoURL || !postDescription}
              >
                Generate
              </button>
            </form>
          </div>
        </div>
      )}

    </StoreContext.Provider>
  );
};