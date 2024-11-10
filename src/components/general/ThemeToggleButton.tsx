import { useState, useEffect } from "react";

function ThemeToggleButton() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("theme");
        return savedMode ? savedMode === "dark" : true; // Default to dark mode
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark"); // Add 'dark' class
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark"); // Remove 'dark' class for light mode
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Toggle to {darkMode ? "Light" : "Dark"} Mode
        </button>
    );
}

export default ThemeToggleButton;
