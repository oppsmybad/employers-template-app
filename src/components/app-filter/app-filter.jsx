import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        { name: "all", label: "Все сотрудники" /* colored: false */ },
        { name: "rise", label: "На повышение" /* colored: false */ },
        {
            name: "salaryMoreThen1000",
            label: "З/П больше 1000$",
            /* colored: true, */
        },
    ];

    // arr of elems
    const buttons = buttonsData.map(({ name, label /* colored */ }) => {
        const active = props.filter === name;
        const clazz = active ? "btn-light" : "btn-outline-light";

        return (
            <button
                type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => props.onFilterSelect(name)}
            >
                {label}
            </button>
        );
    });

    return <div className="btn-group">{buttons}</div>;
};

export default AppFilter;
