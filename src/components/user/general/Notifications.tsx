import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
export default function Notifications() {
    const authContext = useContext(AuthContext);
    console.log(authContext.user);
    return (
        <div className="relative">
            <Icon icon="mdi-light:bell" width="35" height="35" />
            <div className="absolute top-[-5px] right-[-5px] w-[20px] h-[20px] bg-red-500 rounded-full text-center leading-[20px] text-white font-bold">4</div>
        </div>
    );
}
