import { NavLink } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";

interface IProps {
    page: number;
    totalPages: number;
    total: number;
    totalShowed: number;
}
export default function Pagination(props: IProps) {
    return (
        <nav className="w-full bg-dark-secondary-card p-3">
            {!!props.totalShowed && (
                <ul className="flex items-center h-8 text-sm overflow-x-auto">
                    {props.page > 1 && (
                        <li>
                            <NavLink to={`${EnumUserRoutes.LatestRecipes}/${props.page - 1}`} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </NavLink>
                        </li>
                    )}

                    {Array(props.totalPages)
                        .fill(0)
                        .map((_, i) => (
                            <li key={i}>
                                <NavLink to={`${EnumUserRoutes.LatestRecipes}/${i + 1}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    {i + 1}
                                </NavLink>
                            </li>
                        ))}

                    {props.page < props.totalPages && (
                        <li>
                            <NavLink to={`${EnumUserRoutes.LatestRecipes}/${props.page + 1}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </NavLink>
                        </li>
                    )}
                </ul>
            )}
            <div>
                Showing {props.totalShowed} of {props.totalShowed ? props.total : 0}
            </div>
        </nav>
    );
}
