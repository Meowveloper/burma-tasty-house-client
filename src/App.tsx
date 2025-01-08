import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="p-5 min-h-screen">
            <Outlet />
        </div>
    );
}

export default App;
