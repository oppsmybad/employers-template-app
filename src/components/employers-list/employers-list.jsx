import { useEffect, useState, useRef } from "react";
import EmployersListItem from "../employers-list-item/employers-list-item";
import "./employers-list.css";

const EmployersList = ({
    data = [],
    onDelete,
    onToggleProp,
    onSalaryChange,
    onNameChange,
    onDescriptionChange,
}) => {
    const [notification, setNotification] = useState({ message: "", type: "" });
    const notificationTimerRef = useRef(null); // Отдельный реф для таймера уведомлений
    const prevDataRef = useRef(data);
    const fullDataRef = useRef(data);

    const showNotification = (message, type) => {
        if (notificationTimerRef.current) {
            clearTimeout(notificationTimerRef.current);
        }

        setNotification({ message, type });

        notificationTimerRef.current = setTimeout(() => {
            setNotification({ message: "", type: "" });
            notificationTimerRef.current = null;
        }, 3000);
    };

    useEffect(() => {
        const prevData = prevDataRef.current || [];
        const fullData = fullDataRef.current || [];

        const newEmployer = data.find(
            (item) => !fullData.some((prevItem) => prevItem.id === item.id)
        );

        if (newEmployer && data.length > prevData.length) {
            showNotification(
                `Сотрудник ${newEmployer.name} добавлен!`,
                "success"
            );
            fullDataRef.current = [...data];
        }

        prevDataRef.current = data;

        // Очистка теперь не затрагивает notificationTimerRef
    }, [data]);

    const handleDelete = (id) => {
        const deletedEmployer = data.find((item) => item.id === id);
        if (deletedEmployer) {
            showNotification(
                `Сотрудник ${deletedEmployer.name} удалён!`,
                "danger"
            );
        }
        onDelete(id);
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
