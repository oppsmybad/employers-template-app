import { useState, useEffect } from "react";
import "./employers-list-item.css";

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

    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
        classNames += " increase";
    }
    if (rise) {
        classNames += " like";
    }

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
        onNameChange(newName);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleDescriptionBlur = () => {
        // Если описание пустое, возвращаем старое значение
        if (!newDescription.trim()) {
            setNewDescription(description); // Восстанавливаем исходное описание
        }
        onDescriptionChange(newDescription);
        setIsEditingDescription(false);
    };

    useEffect(() => {
        // Сохраняем изменения в localStorage только если описание изменилось
        if (newDescription !== description) {
            onDescriptionChange(newDescription); // Обновляем данные в родительском компоненте
        }
    }, [newDescription, description, id, onDescriptionChange]);

    return (
        <li className={classNames}>
            <input
                type="text"
                className="list-group-item-label"
                value={newName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onClick={onToggleProp}
                data-toggle="rise"
                autoFocus
            />
            <input
                type="text"
                className="list-group-item-input"
                value={newSalary + "$"}
                onChange={handleSalaryChange}
                onBlur={handleSalaryBlur}
            />
            {/* Компонент для описания заслуг сотрудника */}
            <div className="employers-description">
                {isEditingDescription ? (
                    <textarea
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                    />
                ) : (
                    <p onClick={() => setIsEditingDescription(true)}>
                        {newDescription || "Нажмите, чтобы добавить описание"}
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
    );
};

export default EmployersListItem;
