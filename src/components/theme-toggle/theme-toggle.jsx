import React, { useState, useEffect } from "react";
import "./light-theme.css";
import "./dark-theme.css";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Считываем сохраненную тему из localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
            document.body.classList.add(savedTheme); // Устанавливаем класс для body
        } else {
            localStorage.setItem("theme", "light");
            document.body.classList.add("light"); // Устанавливаем светлую тему по умолчанию
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const newTheme = !isDarkMode ? "dark" : "light";

        // Сохраняем тему в localStorage
        localStorage.setItem("theme", newTheme);

        // Удаляем старые классы и добавляем новый
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
