import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import Routes from "./routes/Routes.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <Routes></Routes>
        </AuthContextProvider>
    </StrictMode>
);
