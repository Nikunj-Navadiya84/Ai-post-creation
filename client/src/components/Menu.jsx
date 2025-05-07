import React, { useState, useRef, useEffect } from 'react';
import { FiMoreHorizontal, FiDownload, FiShare2, FiTrash } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import assets from '../assets/assets';

const Menu = () => {
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
                    
                    <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                        <FiEdit className="mr-3" /> Regenerate Post
                    </button>

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
                        <div className="grid grid-cols-5  gap-2 py-3">
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share1} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share2} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share3} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share4} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share5} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share6} className='w-7 h-7' alt="" />
                            </button>
                            <button className="flex items-center justify-center cursor-pointer m-1">
                                <img src={assets.share7} className='w-7 h-7' alt="" />
                            </button>
                        </div>
                    )}

                    <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                        <FiTrash className="mr-3" /> Move To Trash
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
