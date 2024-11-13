import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import UserHome from "../pages/user/Home";
import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import UserRecipeCreate from "../pages/user/RecipeCreate";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { EnumAdminRoutes, EnumUserRoutes } from "../types/EnumRoutes";
import ProtectedRoutes from "../components/general/ProtectedRoutes";
import UserProfile from "../pages/user/Profile";
import UnauthenticatedRoutes from "../components/general/UnAuthenticatedRoutes";

export default function Routes() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <UserLayout />,
            children: [
                {
                    path: EnumUserRoutes.Home,
                    element: <UserHome />,
                },
                {
                    path: EnumUserRoutes.RecipeCreate,
                    element: (
                        <ProtectedRoutes>
                            <UserRecipeCreate />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: `${EnumUserRoutes.Profile}/:id`,
                    element: (
                        <ProtectedRoutes>
                            <UserProfile />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "*",
                    element: (
                        <ProtectedRoutes>
                            <UserHome></UserHome>
                        </ProtectedRoutes>
                    ),
                },
            ],
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: EnumAdminRoutes.Home,
                    element: (
                        <ProtectedRoutes isAdminRoute={true}>
                            <AdminHome />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "*",
                    element: (
                        <ProtectedRoutes isAdminRoute={true}>
                            <UserHome></UserHome>
                        </ProtectedRoutes>
                    ),
                },
            ],
        },
        {
            path: EnumUserRoutes.Login,
            element: (
                <UnauthenticatedRoutes>
                    <Login></Login>
                </UnauthenticatedRoutes>
            ),
        },
        {
            path: EnumUserRoutes.Register,
            element: (
                <UnauthenticatedRoutes>
                    <Register></Register>
                </UnauthenticatedRoutes>
            ),
        },
    ]);

    return <RouterProvider router={routes} />;
}
