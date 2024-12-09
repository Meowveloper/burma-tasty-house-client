import { Link } from "react-router-dom";
import IUser from "../../../types/IUser";
import { EnumUserRoutes } from "../../../types/EnumRoutes";
import { AuthContextType } from "../../../contexts/AuthContext";
interface IProps {
    user: IUser;
    authContext: AuthContextType;
}
export default function UserCard({ user, authContext }: IProps) {
    return (
        <Link to={`${EnumUserRoutes.Profile}/${user._id}`} className="bg-dark-card px-4 py-5 rounded-xl w-fit block">
            <img className="block mx-auto h-24 rounded-full w-24 mb-5" src={user.avatar ? user.avatar : "/image-placeholder.jpg"} alt="user profile" />
            <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg  font-semibold">
                        {user.name}'s Profile {user._id === authContext.user?._id && <span className="font-bold dark:text-dark-text-highlight">(You)</span>}
                    </p>
                    <p className="text-slate-500 font-medium">{user.email}</p>
                </div>
            </div>
        </Link>
    );
}
