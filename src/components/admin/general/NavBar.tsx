import { NavLink } from "react-router-dom";

export default function AdminNavBar() {
    return (
        <nav className="bg-white dark:bg-dark-bg-card relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-logo font-semibold whitespace-nowrap dark:text-dark-text-highlight">Logo</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="absolute dark:bg-[#2B2D31] w-[200px] h-full top-[100%] right-0">
                    <div>
                        <NavLink to="/admin" className={({ isActive }: { isActive: boolean }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}>
                            Home
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/recipe-create" className={({ isActive }: { isActive: boolean }) => `${isActive ? "dark:text-dark-text-highlight" : "dark:text-dark-text"}`}>
                            Create Recipe
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
