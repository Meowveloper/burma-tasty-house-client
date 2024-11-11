import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface UnauthenticatedRouteProps {
    children: JSX.Element;
}

function UnauthenticatedRoutes({ children }: UnauthenticatedRouteProps) {
    const authContext = useContext(AuthContext);

    if (authContext.loading) return <div>Loading...</div>;

    if (authContext.user) {
        // If user is logged in, redirect them away from login/register pages
        const redirectPath = authContext.user.role ? "/admin" : "/";
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

export default UnauthenticatedRoutes;
