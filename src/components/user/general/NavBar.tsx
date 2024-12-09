import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "../../../utilities/axios";
import EnumAuthReducerActionTypes from "../../../types/EnumAuthReducerActionTypes";
import { EnumUserRoutes } from "../../../types/EnumRoutes";
import Notifications from "./Notifications";

export default function NavBar() {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    return (
        <nav className="bg-white dark:bg-[#1E1F22] relative">
            <div className="w-full flex flex-wrap items-center justify-between px-4 py-5 tablet:px-10 desktop:px-[100px]">
                <NavLink to={EnumUserRoutes.Home} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-logo font-semibold whitespace-nowrap dark:text-dark-text-highlight">Logo</span>
                </NavLink>
                <div className="flex items-center justify-start gap-2">
                    <Notifications></Notifications>
                    <button onClick={() => setShowMobileMenu(prev => !prev)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={showMobileMenu}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: showMobileMenu ? 1 : 0, height: showMobileMenu ? "auto" : 0 }} transition={{ duration: 0.3 }} className="absolute dark:bg-[#2B2D31] w-[200px] top-[100%] right-0 z-[9999999] shadow-lg border border-dark-border">
                        {showMobileMenu && (
                            <>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to="/"
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        Home
                                    </NavLink>
                                </div>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to={EnumUserRoutes.RecipeCreate}
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        Create Recipe
                                    </NavLink>
                                </div>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to={`${EnumUserRoutes.Profile}/${authContext.user?._id}`}
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        Profile
                                    </NavLink>
                                </div>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to={`${EnumUserRoutes.SavedRecipes}`}
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        Saved Recipes
                                    </NavLink>
                                </div>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to={`${EnumUserRoutes.PeopleYouFollowed}`}
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        People You Follow
                                    </NavLink>
                                </div>
                                <div className="ps-5 py-3 border-b border-dark-text">
                                    <NavLink
                                        to={`${EnumUserRoutes.YourFollowers}`}
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                        }}
                                        className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                    >
                                        Your Followers
                                    </NavLink>
                                </div>
                                { !authContext.user ? (
                                    <>
                                        <div className="ps-5 py-3 border-b border-dark-text">
                                            <NavLink
                                                to={`${EnumUserRoutes.Login}`}
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                }}
                                                className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                            >
                                                Login
                                            </NavLink>
                                        </div>
                                        <div className="ps-5 py-3">
                                            <NavLink
                                                to={`${EnumUserRoutes.Register}`}
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                }}
                                                className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                                            >
                                                Register
                                            </NavLink>
                                        </div>
                                    </>
                                ) : (
                                    <div className="ps-5 py-3">
                                        <div>
                                            <button className="dark:text-dark-text" onClick={() => { setShowMobileMenu(false); logout();}}>Logout</button>
                                        </div>
                                    </div>
                                ) }
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </nav>
    );

    async function logout() {
        try {
            const response = await axios.post("/users/logout");
            console.log(response);
            authContext.dispatch({ type: EnumAuthReducerActionTypes.Logout });
            history.pushState(null, "", "/");
        } catch (error) {
            console.log(error);
        }
    }
}
