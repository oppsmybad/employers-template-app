import { useState } from "react";

import "./employers-list-item.css";

const EmployersListItem = (props) => {
    const {
        name,
        salary,
        onDelete,
        onToggleProp,
        increase,
        rise,
        onSalaryChange,
        onNameChange,
    } = props;

    const [newSalary, setNewSalary] = useState(salary);
    const [newName, setNewName] = useState(name);

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
        onSalaryChange(parseInt(newSalary, 10) || 0); // Преобразуем в число
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNameBlur = () => {
        onNameChange(newName);
    };

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
            <div className="d-flex justify-content-center align-items-center">
                <button
                    type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle="increase"
                >
                    <i className="fas fa-cookie"></i>
                </button>

                <button
                    type="button"
                    className="btn-trash btn-sm "
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
