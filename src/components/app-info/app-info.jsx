import React, { useState } from "react";
import "./app-info.css";

const AppInfo = ({ increased, employers, initialCompanyName = "N" }) => {
    const [companyName, setCompanyName] = useState(initialCompanyName);
    const [isEditing, setEditing] = useState(false);

    const handleNameChange = (e) => {
        setCompanyName(e.target.value);
    };

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
                        onBlur={toggleEditing}
                        autoFocus
                    />
                ) : (
                    <span onClick={toggleEditing}>{companyName}</span>
                )}
            </h1>
            <h2>Общее число сотрудников: {employers}</h2>
            <h2>Премию получат: {increased}</h2>

            <div className="info-explanation">
                <p style={{ fontSize: 14, marginTop: 20 }}>
                    <strong>Печенька</strong> <i className="fas fa-cookie"></i>{" "}
                    Этот символ обозначает, что сотрудник получил премию или
                    бонус за свою работу.
                    <br /> Нажмите на иконку с печенькой чтобы отметить
                    сотрудника.
                </p>
                <p style={{ fontSize: 14 }}>
                    <strong>Звездочка</strong> <i className="fas fa-star"></i>{" "}
                    Этот символ указывает на сотрудников, которые могут быть
                    повышены.
                    <br />
                    Нажмите на поле с именем чтобы отметить сотрудника.
                </p>
            </div>
        </div>
    );
};

export default AppInfo;
