import React, { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiDownload, FiShare2, FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import assets from '../assets/assets';
import { Link } from 'react-router-dom';

const Menu = ({ selectedPost, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
                setShareOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = () => {
        onDelete(selectedPost?._id); // Call the passed delete handler with post ID
        setOpen(false); // Close the menu after deletion
    };

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
                <FiMoreHorizontal size={22} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 py-2">

                    <Link to="/postReady" state={{ selectedPost }}>
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FiEdit className="mr-3" /> Regenerate Post
                        </button>
                    </Link>

                    <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                        <FiDownload className="mr-3" /> Download
                    </button>

                    <button
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setShareOpen((prev) => !prev)}
                        type="button"
                    >
                        <FiShare2 className="mr-3" /> Share
                        <span className="ml-auto">
                            {shareOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </button>

                    {shareOpen && (
                        <div className="grid grid-cols-5 gap-2 py-3 px-4">
                            {[assets.share4, assets.share1, assets.share2, assets.share3, assets.share5, assets.share6, assets.share7].map((icon, idx) => (
                                <button key={idx} className="flex items-center justify-center cursor-pointer m-1">
                                    <img src={icon} className='w-7 h-7' alt={`share-${idx}`} />
                                </button>
                            ))}
                        </div>
                    )}

                    <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors cursor-pointer">
                        <RiDeleteBinLine className="mr-3" /> Move To Trash
                    </button>
                    
                </div>
            )}
        </div>
    );
};

export default Menu;
