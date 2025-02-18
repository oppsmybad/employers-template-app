import React, { useState } from "react";
import "./app-info.css";

const AppInfo = ({
    increased,
    employers,
    initialCompanyName = "N", // Переименован пропс
}) => {
    // Состояние для хранения и изменения companyName
    const [companyName, setCompanyName] = useState(initialCompanyName);
    // Состояние для отслеживания режима редактирования
    const [isEditing, setEditing] = useState(false);

    // Обработчик изменения значения в текстовом поле
    const handleNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    // Переключение режима редактирования
    const toggleEditing = () => {
        setEditing(!isEditing);
    };

    return (
        <div className="app-info">
            <h1>
                Учет сотрудников в компании{" "}
                {isEditing ? (
                    <input
                        type="text"
                        value={companyName}
                        onChange={handleNameChange}
                        onBlur={toggleEditing} // Завершаем редактирование при потере фокуса
                        autoFocus // Автоматически фокусируемся на поле ввода
                    />
                ) : (
                    <span onClick={toggleEditing}>{companyName}</span> // Режим просмотра
                )}
            </h1>
            <h2>Общее число сотрудников: {employers}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    );
};

export default AppInfo;
