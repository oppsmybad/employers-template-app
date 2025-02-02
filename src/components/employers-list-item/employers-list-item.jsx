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
    } = props;

    const [newSalary, setNewSalary] = useState(salary);

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
        onSalaryChange(newSalary);
    };

    return (
        <li className={classNames}>
            <span
                className="list-group-item-label"
                onClick={onToggleProp}
                data-toggle="rise"
                // inline styles
                // style={{
                //     fontSize: "36px",
                //     color: "red",
                //     transition: "all",
                //     WebkitTransition: "all",
                //     msTransition: "all",
                // }}
            >
                {name}
            </span>
            <input
                type="text"
                className="list-group-item-input"
                // defaultValue={salary + "$"}
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
