import "./app-filter.css";

const AppFilter = (props) => {
    const buttonsData = [
        { name: "all", label: "Все сотрудники" },
        { name: "rise", label: "На повышение" },
        {
            name: "salaryMoreThen1000",
            label: "З/П больше 1000$",
        },
        { name: "bonus", label: "Премия - Бонус" },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? "btn-light active" : "btn-outline-light ";

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
