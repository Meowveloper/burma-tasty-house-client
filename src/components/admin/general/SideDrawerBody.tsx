import { 
  Drawer,
  Sidebar,
} from "flowbite-react";
import {
  HiChartPie,
  HiLogin,
} from "react-icons/hi";
import { EnumAdminRoutes, EnumUserRoutes } from "../../../types/EnumRoutes";
import SideDrawerMenuItem from "./SideDrawerMenuItem";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface IProps {
    isOpen : boolean;
    handleClose : () => void;
}
export default function SideDrawerBody({ isOpen , handleClose }: IProps) {
  return (
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <SideDrawerMenuItem to={EnumAdminRoutes.Home} icon={HiChartPie}>
                      Dashboard
                    </SideDrawerMenuItem>

                    <SideDrawerMenuItem to={EnumAdminRoutes.Reports} icon={HiChartPie}>
                      Reports
                    </SideDrawerMenuItem>

                    <SideDrawerMenuItem to={EnumUserRoutes.Login} icon={HiLogin} isLogout={true}>
                      Logout
                    </SideDrawerMenuItem>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
  )
}
