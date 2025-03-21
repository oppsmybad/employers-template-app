import { useEffect, useState, useRef } from "react";
import EmployersListItem from "../employers-list-item/employers-list-item";

import "./employers-list.css";

const EmployersList = ({
    data,
    onDelete,
    onToggleProp,
    onSalaryChange,
    onNameChange,
    onDescriptionChange,
}) => {
    const [notification, setNotification] = useState({ message: "", type: "" });
    const timerRef = useRef(null); // Для управления таймером уведомлений
    const prevDataRef = useRef(data); // Для отслеживания изменений в data

    // Функция для показа уведомления
    const showNotification = (message, type) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setNotification({ message, type });

        timerRef.current = setTimeout(() => {
            setNotification({ message: "", type: "" });
            timerRef = null;
        }, 3000);
    };

    // Отслеживание добавления нового сотрудника через изменения в data
    useEffect(() => {
        const prevData = prevDataRef.current;
        if (data.length > prevData.length) {
            // Предполагаем, что добавлен новый сотрудник
            const newEmployer = data.find(
                (item) => !prevData.some((prevItem) => prevItem.id === item.id)
            );
            if (newEmployer) {
                showNotification(
                    `Сотрудник ${newEmployer.name} добавлен!`,
                    "success"
                );
            }
        }
        prevDataRef.current = data; // Обновляем предыдущее значение

        // Очистка таймера при размонтировании
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [data]);

    // Обработчик удаления с уведомлением
    const handleDelete = (id) => {
        const deletedEmployer = data.find((item) => item.id === id);
        if (deletedEmployer) {
            showNotification(
                `Сотрудник ${deletedEmployer.name} удалён!`,
                "danger"
            );
        }
        onDelete(id); // Вызываем оригинальный onDelete
    };

    const elements = data.map((item) => {
        const { id, description, ...itemProps } = item;
        return (
            <EmployersListItem
                key={id}
                {...itemProps}
                description={description}
                onDelete={() => handleDelete(id)}
                onToggleProp={(e) =>
                    onToggleProp(
                        id,
                        e.currentTarget.getAttribute("data-toggle")
                    )
                }
                onSalaryChange={(newSalary) => onSalaryChange(id, newSalary)}
                onNameChange={(newName) => onNameChange(id, newName)}
                onDescriptionChange={(newDescription) =>
                    onDescriptionChange(id, newDescription)
                }
            />
        );
    });

    return (
        <>
            {/* Уведомление */}
            {notification.message && (
                <div
                    className={`alert alert-${notification.type} alert-dismissible fade show mt-2`}
                    role="alert"
                    style={{
                        position: "fixed",
                        top: "10px",
                        right: "10px",
                        zIndex: 1000,
                    }}
                >
                    {notification.message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() =>
                            setNotification({ message: "", type: "" })
                        }
                        aria-label="Close"
                    ></button>
                </div>
            )}
            <ul className="app-list list-group">{elements}</ul>
        </>
    );
};

export default EmployersList;
