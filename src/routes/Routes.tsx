import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import UserHome from '../pages/user/Home'
import AdminLayout from '../layouts/AdminLayout';
import AdminHome from '../pages/admin/AdminHome';
import UserRecipeCreate from '../pages/user/RecipeCreate';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import { EnumUserRoutes } from '../types/EnumRoutes';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoadingScreen = () => <div className='mt-5 ms-5 text-h1 dark:text-dark-text-highlight'>Loading...</div>;
export default function Routes() {
    const authContext = useContext(AuthContext);
    if(authContext.loading) return LoadingScreen();

    const routes = createBrowserRouter([
        {
            path : '/',
            element : <UserLayout/>, 
            children : [
                {
                    path : EnumUserRoutes.Home, 
                    element : <UserHome/>
                }, 
                {
                    path : EnumUserRoutes.RecipeCreate,
                    element : authContext.user ? <UserRecipeCreate/> : <Navigate to={EnumUserRoutes.Login}></Navigate>
                }, 
                {
                    path : EnumUserRoutes.Login, 
                    element : !authContext.user ? <Login/> : <Navigate to={EnumUserRoutes.Home}></Navigate>
                }, 
                {
                    path : EnumUserRoutes.Register, 
                    element : !authContext.user ? <Register/> : <Navigate to={EnumUserRoutes.Home}></Navigate>
                }
            ]
        }, 
        {
            path : '/admin', 
            element : <AdminLayout/>, 
            children : [
                {
                    path : '', 
                    element : <AdminHome/>
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={routes}></RouterProvider>
    );
}
