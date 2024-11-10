import { Outlet } from "react-router-dom";
import UserGeneralNavBar from "../components/user/general/NavBar";
// import PageAnimate from "./PageAnimate";

export default function UserLayout() {
    return (
        <div>
            <UserGeneralNavBar></UserGeneralNavBar>
            <main className="p-5">
                {/* <PageAnimate> */}
                    <Outlet />
                {/* </PageAnimate> */}
            </main>
        </div>
    );
}
