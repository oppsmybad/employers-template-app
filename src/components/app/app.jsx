import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);

        const savedData = localStorage.getItem("employers");

        // Инициализируем данные и вычисляем максимальный ID
        const initialData = savedData
            ? JSON.parse(savedData)
            : [
                  {
                      name: "John C.",
                      salary: 800,
                      increase: false,
                      rise: true,
                      id: 1,
                  },
                  {
                      name: "Alex M.",
                      salary: 3000,
                      increase: true,
                      rise: false,
                      id: 2,
                  },
                  {
                      name: "Carl W.",
                      salary: 5000,
                      increase: false,
                      rise: false,
                      id: 3,
                  },
              ];

        // Вычисляем максимальный ID
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

    // Метод сохранения данных в localStorage
    saveToLocalStorage = (data) => {
        localStorage.setItem("employers", JSON.stringify(data));
    };

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const updatedData = data.filter((item) => item.id !== id);
            this.saveToLocalStorage(updatedData); // Сохраняем изменения
            return {
                data: updatedData,
            };
        });
    };

    addItem = (name, salary) => {
        if (!name.trim() || !salary.trim()) return;

        const newItem = {
            name,
            salary: parseInt(salary, 10) || 0,
            increase: false,
            rise: false,
            id: this.state.maxId + 1, // Используем maxId из состояния
        };

        this.setState(({ data, maxId }) => {
            const newArr = [...data, newItem];
            this.saveToLocalStorage(newArr);
            return {
                data: newArr,
                maxId: maxId + 1, // Обновляем maxId
            };
        });
    };

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, [prop]: !item[prop] } : item
            );
            this.saveToLocalStorage(updatedData); // Сохраняем изменения
            return { data: updatedData };
        });
    };

    updateSalary = (id, newSalary) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, salary: newSalary } : item
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
                />
                <EmployersAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
