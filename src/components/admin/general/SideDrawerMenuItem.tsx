import { IconType } from "react-icons";
import { EnumAdminRoutes, EnumUserRoutes } from "../../../types/EnumRoutes"
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../../utilities/generalHelperFunctions";
import { AuthContext } from "../../../contexts/AuthContext";

interface IProps {
    to : EnumAdminRoutes | EnumUserRoutes;
    icon : IconType;
    isLogout? : boolean;
    children : React.ReactNode;
}
export default function SideDrawerMenuItem({ to, icon : Icon, children, isLogout = false }: IProps) {
  const authContext = useContext(AuthContext);
  console.log('is logout', isLogout);
  if(isLogout) return (
    <div onClick={() => logout(authContext)} className="flex items-center gap-3 justify-start px-2 py-3 hover:bg-gray-600 rounded-md cursor-pointer">
        <Icon className="w-[20px] h-[20px]" />
        <div className="text-white">
            {children}
        </div>
    </div>
  );

  return (
    <NavLink to={to} className="flex items-center gap-3 justify-start px-2 py-3 hover:bg-gray-600 rounded-md cursor-pointer">
        <Icon className="w-[20px] h-[20px]" />
        <div className="text-white">
            {children}
        </div>
    </NavLink>
  )
}
