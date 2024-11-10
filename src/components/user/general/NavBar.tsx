import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from '../../../utilities/axios';
import EnumAuthReducerActionTypes from "../../../types/EnumAuthReducerActionTypes";

export default function NavBar() {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-white dark:bg-[#1E1F22] relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-logo font-semibold whitespace-nowrap dark:text-dark-text-highlight">Logo</span>
                </a>
                <div className="flex items-center justify-start gap-2">
                    <div className="">
                        { authContext.user && <div onClick={ logout } className="text-h2 font-bold cursor-pointer">Logout</div> }
                        { !authContext.user && <NavLink className="text-h2 font-bold cursor-pointer" to="/auth/login">Login</NavLink>}
                        
                    </div>
                    <button onClick={() => setShowMobileMenu(prev => !prev)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={showMobileMenu}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: showMobileMenu ? 1 : 0, height: showMobileMenu ? "auto" : 0 }} transition={{ duration: 0.3 }} className="absolute dark:bg-[#2B2D31] w-[200px] top-[100%] right-0">
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
                                to="/recipe-create"
                                onClick={() => {
                                    setShowMobileMenu(false);
                                }}
                                className={({ isActive }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}
                            >
                                Create Recipe
                            </NavLink>
                        </div>
                    </motion.div>
                </div>
            </div>
        </nav>
    );

    function logout () {
        axios.post('/users/logout').then(res => {
            console.log(res);
            if(res.status === 200) {
                authContext.dispatch({ type: EnumAuthReducerActionTypes.Logout });
                navigate('/');                
            }
        })
    }
}
