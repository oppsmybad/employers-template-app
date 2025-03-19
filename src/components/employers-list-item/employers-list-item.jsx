import { useState, useEffect, useRef } from "react";
import "./employers-list-item.css";
import "../bootstrap-css/bootstrap.min.css";

const EmployersListItem = (props) => {
    const {
        id,
        name,
        salary,
        description,
        onDelete,
        onToggleProp,
        increase,
        rise,
        onSalaryChange,
        onNameChange,
        onDescriptionChange,
    } = props;

    const [newSalary, setNewSalary] = useState(salary);
    const [newName, setNewName] = useState(name);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newDescription, setNewDescription] = useState(description || "");
    const [notification, setNotification] = useState({ message: "", type: "" }); // Состояние для уведомления
    const timerRef = useRef(null); // Храним таймер в useRef для надёжной очистки

    // Храним предыдущие значения increase и rise
    const prevIncreaseRef = useRef(increase);
    const prevRiseRef = useRef(rise);
    const isMountedRef = useRef(false); // Флаг для отслеживания монтирования

    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        classNames += " increase";
    }
    if (rise) {
        classNames += " like";
    }

    // Функция для показа уведомления
    const showNotification = (message, type) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setNotification({ message, type });

        timerRef.current = setTimeout(() => {
            setNotification({ message: "", type: "" });
            timerRef.current = null;
        }, 3000);
    };

    // Отслеживание изменений increase и rise
    useEffect(() => {
        // Пропускаем первый рендер (монтирование)
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            prevIncreaseRef.current = increase;
            prevRiseRef.current = rise;
            return;
        }

        // Проверяем, изменилось ли increase
        if (increase !== prevIncreaseRef.current) {
            if (increase) {
                showNotification("Сотруднику назначен бонус!", "success");
            } else {
                showNotification("Бонус отменён.", "warning");
            }
        }

        // Проверяем, изменилось ли rise
        if (rise !== prevRiseRef.current) {
            if (rise) {
                showNotification(
                    "Сотрудник получил повышение зарплаты!",
                    "info"
                );
            } else {
                showNotification("Повышение зарплаты отменено.", "warning");
            }
        }
        // Обновляем предыдущие значения
        prevIncreaseRef.current = increase;
        prevRiseRef.current = rise;

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [increase, rise]);

    // Отслеживание изменений increase
    // useEffect(() => {}, [increase]);

    // Отслеживание изменений rise
    // useEffect(() => {}, [rise]);

    const handleSalaryChange = (e) => {
        setNewSalary(e.target.value.replace(/\D/g, ""));
    };

    const handleSalaryBlur = () => {
        onSalaryChange(parseInt(newSalary, 10) || 0);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNameBlur = () => {
        onNameChange(newName.trim() || name);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleDescriptionBlur = () => {
        if (!newDescription.trim()) {
            setNewDescription(description);
        }
        onDescriptionChange(newDescription);
        setIsEditingDescription(false);
    };

    useEffect(() => {
        if (newDescription !== description) {
            onDescriptionChange(newDescription);
        }
    }, [newDescription]);

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
            <li className={classNames}>
                <input
                    type="text"
                    className="form-control list-group-item-label"
                    style={{ width: "auto" }}
                    value={newName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onClick={onToggleProp}
                    data-toggle="rise"
                />
                <input
                    type="text"
                    className="form-control list-group-item-input"
                    style={{ width: "auto" }}
                    value={newSalary + "$"}
                    onChange={handleSalaryChange}
                    onBlur={handleSalaryBlur}
                />
                <div className="employers-description">
                    {isEditingDescription ? (
                        <textarea
                            className="form-control"
                            style={{ width: "auto" }}
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                        />
                    ) : (
                        <p onClick={() => setIsEditingDescription(true)}>
                            {newDescription ||
                                "Нажмите, чтобы добавить должность"}
                        </p>
                    )}
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-cookie btn-sm"
                        onClick={onToggleProp}
                        data-toggle="increase"
                    >
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        </>
    );
};

export default EmployersListItem;
