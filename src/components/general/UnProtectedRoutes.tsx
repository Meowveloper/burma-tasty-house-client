
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    isAdminRoute?: boolean;
    children: JSX.Element;
}

function UnProtectedRoutes({ isAdminRoute = false, children }: ProtectedRouteProps) {
    const authContext = useContext(AuthContext);
    console.log('is admin route', isAdminRoute)
    console.log( authContext.user?.role? 'admin' : 'user');

    if (authContext.loading) return <div>Loading...</div>;


    // Check for admin route and user role
    if (authContext.user && isAdminRoute && !authContext.user.role) {
        return <Navigate to="/" replace />;
    }

    // Check for user route when the user is an admin
    if (authContext.user && !isAdminRoute && authContext.user.role) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
export default UnProtectedRoutes;
