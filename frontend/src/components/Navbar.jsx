import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "./../assets/frontend_assets/assets";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUzbek, setIsUzbek] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } = useContext(ShopContext);

    const logout = () => {
        // Tokenni localStorage-dan o'chirish
        localStorage.removeItem("token");

        // Tokenni holatni bo'shatish
        setToken("");

        // Savatni tozalash
        setCartItem({});

        // Login sahifasiga yo'naltirish
        if (navigate) {
            navigate("/login");
        } else {
            window.location.href = "/login"; // Zaxira usul sifatida
        }
    };


    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen); // Toggle search visibility
    };

    return (
        <div>
            <div className="flex items-center justify-between px-4 py-6 font-medium">
                {/* Logo */}
                <Link to={"/"}>
                    <img src={assets.logo} alt="Logo" className="object-cover w-36" />
                </Link>

                {/* Nav Links for larger screens */}
                <ul className="hidden gap-8 text-sm text-gray-700 md:flex">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center gap-1 text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-2/4 after:bg-black"
                                : "flex flex-col items-center gap-1"
                        }
                    >
                        <p className="uppercase">{t("navbar.home")}</p>
                    </NavLink>

                    <NavLink
                        to="/collection"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center gap-1 text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-2/4 after:bg-black"
                                : "flex flex-col items-center gap-1"
                        }
                    >
                        <p className="uppercase">{t("navbar.collection")}</p>
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center gap-1 text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-2/4 after:bg-black"
                                : "flex flex-col items-center gap-1"
                        }
                    >
                        <p className="uppercase">{t("navbar.about")}</p>
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center gap-1 text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-2/4 after:bg-black"
                                : "flex flex-col items-center gap-1"
                        }
                    >
                        <p className="uppercase">{t("navbar.contact")}</p>
                    </NavLink>
                </ul>


                {/* Right Section */}
                <div className="flex items-center gap-6">

                    {/* Search Icon */}
                    <img
                        src={assets.search_icon}
                        alt="Search"
                        className="w-6 cursor-pointer"
                        onClick={toggleSearch}
                    />

                    {/* Profile Dropdown */}
                    <div className="relative group">
                        <Link to={"/login"}>
                            <img className="w-6 cursor-pointer" src={assets.profile_icon} alt="Profile" />
                        </Link>
                        <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    {/* Cart Icon */}
                    <Link to={"/cart"} className="relative">
                        <img
                            src={assets.cart_icon}
                            alt="Cart"
                            className="w-6 cursor-pointer"
                        />
                        <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
                            {getCartCount()}
                        </span>
                    </Link>
                    {/* Burger Menu Icon */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block md:hidden"
                    >
                        {isMenuOpen ? (
                            <IoCloseOutline className="w-8 h-8 text-black" />
                        ) : (
                            <img
                                className="w-6 cursor-pointer"
                                src={assets.menu_icon}
                                alt="Menu"
                            />
                        )}
                    </button>
                </div>
            </div>

            {/* SearchBar for mobile */}
            {isSearchOpen && (
                <div className="px-4 mb-4">
                    <SearchBar />
                </div>
            )}


            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="w-full bg-gray-100 md:hidden">
                    <ul className="flex flex-col justify-start gap-8 mb-8 text-sm text-gray-700 sm:flex-row sm:text-base">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black font-bold hover:text-black"
                                    : "flex flex-col items-start gap-2 text-gray-600"
                            }
                        >
                            <p className="flex items-center gap-1 uppercase">
                                🏠 {t("navbar.home")}
                            </p>
                        </NavLink>

                        <NavLink
                            to="/collection"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black font-bold hover:text-black"
                                    : "flex flex-col items-start gap-2 text-gray-600"
                            }
                        >
                            <p className="flex items-center gap-1 uppercase">
                                🖼 {t("navbar.collection")}
                            </p>
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black font-bold hover:text-black"
                                    : "flex flex-col items-start gap-2 text-gray-600"
                            }
                        >
                            <p className="flex items-center gap-1 uppercase">
                                ℹ️ {t("navbar.about")}
                            </p>
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black font-bold hover:text-black"
                                    : "flex flex-col items-start gap-2 text-gray-600"
                            }
                        >
                            <p className="flex items-center gap-1 uppercase">
                                📞 {t("navbar.contact")}
                            </p>
                        </NavLink>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;