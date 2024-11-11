import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";

export default function Profile() {
    const authContext = useContext(AuthContext);
    if (!authContext.user) return <Navigate to={EnumUserRoutes.Login} />;

    return (
        <div>
            <div className="text-h1">{authContext.user.name}'s Profile</div>
            <div className="text-h2">email - {authContext.user.email}</div>

            <div>
              <div className="text-h1 font-bold">
                Recipes
              </div>

            </div>
        </div>
    );
}
