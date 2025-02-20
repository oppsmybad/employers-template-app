import { Component } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import ThemeToggle from "../theme-toggle/theme-toggle";
import ImportExportComponent from "../file-manager/file-manager";
import "./app.css";
import "../bootstrap-css/bootstrap.min.css";

class App extends Component {
    constructor(props) {
        super(props);

        const savedData = localStorage.getItem("employers");

        const initialData = savedData
            ? JSON.parse(savedData).map((item) => ({
                  ...item,
                  salary: parseInt(item.salary, 10) || 0,
              }))
            : [
                  {
                      name: "John C.",
                      salary: 800,
                      increase: false,
                      rise: true,
                      description: "",
                      id: 1,
                  },
                  {
                      name: "Alex M.",
                      salary: 1200,
                      increase: true,
                      rise: false,
                      description: "",
                      id: 2,
                  },
                  {
                      name: "Carl W.",
                      salary: 2000,
                      increase: false,
                      rise: false,
                      description: "",
                      id: 3,
                  },
              ];

        const maxId = initialData.length
            ? Math.max(...initialData.map((item) => item.id))
            : 0;

        this.state = {
            data: initialData,
            term: "",
            filter: "all",
            maxId: maxId,
        };
    }

    saveToLocalStorage = (data) => {
        const updatedData = data.map((item) => ({
            ...item,
            salary: parseInt(item.salary, 10) || 0,
        }));
        localStorage.setItem("employers", JSON.stringify(updatedData));
    };

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const updatedData = data.filter((item) => item.id !== id);
            this.saveToLocalStorage(updatedData);
            return {
                data: updatedData,
            };
        });
    };

    addItem = (name, salary) => {
        if (!name.trim() || !salary) return;

        const newItem = {
            name,
            salary: parseInt(salary, 10) || 0,
            increase: false,
            rise: false,
            description: "",
            id: this.state.maxId + 1,
        };

        this.setState(({ data, maxId }) => {
            const newArr = [...data, newItem];
            this.saveToLocalStorage(newArr);
            return {
                data: newArr,
                maxId: maxId + 1,
            };
        });
    };

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, [prop]: !item[prop] } : item
            );
            this.saveToLocalStorage(updatedData);
            return { data: updatedData };
        });
    };

    updateSalary = (id, newSalary) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id
                    ? { ...item, salary: parseInt(newSalary, 10) || 0 }
                    : item
            );
            this.saveToLocalStorage(updatedData);
            return { data: updatedData };
        });
    };

    updateName = (id, newName) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) => {
                return item.id === id ? { ...item, name: newName } : item;
            });
            this.saveToLocalStorage(updatedData);
            return { data: updatedData };
        });
    };

    updateDescription = (id, newDescription) => {
        const currentDescription = this.state.data.find(
            (item) => item.id === id
        ).description;

        if (currentDescription === newDescription.trim()) return;

        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, description: newDescription } : item
            );
            this.saveToLocalStorage(updatedData);
            return { data: updatedData };
        });
    };

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.indexOf(term) > -1;
        });
    };

    onUpdateSearch = (term) => {
        this.setState({ term });
    };

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter((item) => item.rise);
            case "salaryMoreThen1000":
                return items.filter((item) => item.salary > 1000);
            default:
                return items;
        }
    };

    onFilterSelect = (filter) => {
        this.setState({ filter });
    };

    render() {
        const { data, term, filter } = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(
            (item) => item.increase
        ).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <div className="theme-toggle">
                    <ThemeToggle />
                </div>
                <AppInfo employers={employers} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.updateSalary}
                    onNameChange={this.updateName}
                    onDescriptionChange={this.updateDescription}
                />
                <EmployersAddForm onAdd={this.addItem} />

                {/* Добавление компонента для импорта/экспорта. 
                P.S: пока что не рабочий компонент*/}
                {/* <ImportExportComponent /> */}
            </div>
        );
    }
}

export default App;
