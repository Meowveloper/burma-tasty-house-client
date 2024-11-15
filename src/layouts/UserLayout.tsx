import { Outlet } from "react-router-dom";
import UserGeneralNavBar from "../components/user/general/NavBar";
// import PageAnimate from "./PageAnimate";

export default function UserLayout() {
    return (
        <div className="">
            <UserGeneralNavBar></UserGeneralNavBar>
            <main className="px-4 py-10 tablet:px-10 desktop:px-[100px]">
                {/* <PageAnimate> */}
                    <Outlet />
                {/* </PageAnimate> */}
            </main>
        </div>
    );
}
