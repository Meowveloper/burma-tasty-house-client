import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    isAdminRoute?: boolean;
    children: JSX.Element;
}

function ProtectedRoutes({ isAdminRoute = false, children }: ProtectedRouteProps) {
    const authContext = useContext(AuthContext);

    if (authContext.loading) return <div>Loading...</div>;

    if (!authContext.user) {
        return <Navigate to="/login" replace />;
    }

    // Check for admin route and user role
    if (isAdminRoute && !authContext.user.role) {
        return <Navigate to="/" replace />;
    }

    // Check for user route when the user is an admin
    if (!isAdminRoute && authContext.user.role) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
export default ProtectedRoutes;