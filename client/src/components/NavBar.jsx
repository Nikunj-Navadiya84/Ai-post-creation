import React from "react";

const Navbar = () => {

    return (
        <div className="main-header-container sticky top-0 p-4 flex justify-between items-center bg-white shadow-md z-50">

            <div>
                <h1 className="text-lg font-semibold">Logo</h1>
            </div>

            <div>
                <p className="text-lg">UserName</p>
            </div>

        </div>

    );
};

export default Navbar;
