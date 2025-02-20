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
    const elements = data.map((item) => {
        const { id, description, ...itemProps } = item;
        return (
            <EmployersListItem
                key={id}
                {...itemProps}
                description={description}
                onDelete={() => onDelete(id)}
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

    return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployersList;
