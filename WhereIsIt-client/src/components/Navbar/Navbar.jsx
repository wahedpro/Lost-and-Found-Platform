import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const { user, logoutUser } = useContext(authContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMenus = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <div>
            <div className="container mx-auto flex justify-between items-center py-4 px-5 bg-white border">
                {/* Website Name */}
                <NavLink to="/" className="font-semibold text-2xl text-gray-800 hover:text-[#6666F2]">WhereIsIt</NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-[#6666F2] font-semibold border-b-2 border-[#6666F2]" : "text-gray-700 hover:text-[#6666F2]"
                        }
                    > Home
                    </NavLink>
                    
                    <NavLink
                        to="/allItems"
                        className={({ isActive }) =>
                            isActive ? "text-[#6666F2] font-semibold border-b-2 border-[#6666F2]" : "text-gray-700 hover:text-[#6666F2]"
                        }
                    > Lost and Found Items
                    </NavLink>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative flex items-center gap-3">
                            {/* Profile Picture */}
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                                src={user.photoURL}
                                alt="User Profile"
                                onClick={toggleDropdown}
                                title={user.displayName}
                            />

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-md rounded p-4 flex-col gap-2 items-start w-40 z-50">
                                    <NavLink
                                        to="/addItems"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                                        onClick={closeMenus}
                                    > Add Lost & Found Item
                                    </NavLink>
                                    <NavLink
                                        to="/allRecovered"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                                        onClick={closeMenus}
                                    > All Recovered Items
                                    </NavLink>
                                    <NavLink
                                        to="/myItems"
                                        className="block px-2 py-1 text-gray-700 hover:bg-gray-200 rounded"
                                        onClick={closeMenus}
                                    >Manage My Items
                                    </NavLink>
                                </div>
                            )}

                            {/* Logout Button */}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMenus();
                                }}
                                className="px-4 py-2 text-white bg-[#6666F2] rounded hover:bg-[#6666F2] transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // Login Button
                        <div className="flex gap-3 items-center">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "px-5 py-2 border bg-[#6666F2] text-white rounded"
                                        : "px-5 py-2 border bg-white text-gray-700 hover:bg-[#6666F2] hover:text-white rounded"
                                }
                            >
                                Log in
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center">
                    <button
                        className="text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md px-5 py-3">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "block py-2 text-[#6666F2] font-semibold" : "block py-2 text-gray-700 hover:text-[#6666F2]"
                        }
                        onClick={closeMenus}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/allItems"
                        className={({ isActive }) =>
                            isActive ? "block py-2 text-[#6666F2] font-semibold" : "block py-2 text-gray-700 hover:text-[#6666F2]"
                        }
                        onClick={closeMenus}
                    >
                        Lost and Found Items
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Navbar;