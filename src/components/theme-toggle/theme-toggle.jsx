import React, { useState, useEffect } from "react";
import "./light-theme.css";
import "./dark-theme.css";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
            document.body.classList.add(savedTheme);
        } else {
            localStorage.setItem("theme", "light");
            document.body.classList.add("light");
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const newTheme = !isDarkMode ? "dark" : "light";

        localStorage.setItem("theme", newTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    };

    return (
        <button onClick={toggleTheme} className="btn btn-sm btn-toggle">
            {isDarkMode ? "🌞 Светлая тема" : "🌙 Темная тема"}
        </button>
    );
};

export default ThemeToggle;
