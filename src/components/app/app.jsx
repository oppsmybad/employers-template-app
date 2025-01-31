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
        const savedData = JSON.parse(localStorage.getItem("employers")) || [
            {
                name: "John C.",
                salary: 600,
                increase: true,
                rise: true,
                id: 1,
            },
            {
                name: "Alex M.",
                salary: 900,
                increase: false,
                rise: false,
                id: 2,
            },
            {
                name: "Karl R.",
                salary: 1200,
                increase: false,
                rise: false,
                id: 3,
            },
        ];
        this.state = {
            data: savedData,
            term: "",
            filter: "all",
        };

        this.maxId = savedData.length
            ? Math.max(...savedData.map((item) => item.id)) + 1
            : 1;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // first way to deleteItem

            // const index = data.findIndex((elem) => elem.id === id);

            // first way to deleteItem
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            // second way to deleteItem
            return {
                data: data.filter((item) => item.id !== id),
            };
            // console.log(index); находим индекс по методу findIndex()
        });
    };

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++,
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];

            this.saveToLocalStorage(newArr);

            return {
                data: newArr,
            };
        });
    };

    onToggleProp = (id, prop) => {
        // first way
        // this.setState(({ data }) => {
        //     const index = data.findIndex((elem) => elem.id === id);
        //     const old = data[index];
        //     const newItem = { ...old, increase: !old.increase };
        //     const newArr = [
        //         ...data.slice(0, index),
        //         newItem,
        //         ...data.slice(index + 1),
        //     ];
        //     return {
        //         data: newArr,
        //     };
        // });

        // second way
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };

    // onToggleRise = (id) => {
    //     this.setState(({ data }) => ({
    //         data: data.map((item) => {
    //             if (item.id === id) {
    //                 return { ...item, rise: !item.rise };
    //             }
    //             return item;
    //         }),
    //     }));
    // };

    searchEmp = (items, term) => {
        // Проверка пустой строки
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

    // Метод сохранения данных в localStorage
    saveToLocalStorage = (data) => {
        localStorage.setItem("employers", JSON.stringify(data));
    };

    // Обновление зарплаты и сохранение в localStorage
    updateSalary = (id, newSalary) => {
        this.setState(({ data }) => {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, salary: newSalary } : item
            );

            this.saveToLocalStorage(updatedData); // Сохраняем в localStorage

            return { data: updatedData };
        });
    };

    render() {
        const { data, term, filter } = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(
            (item) => item.increase
        ).length;
        // Комбинированная Фильтрация
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
                    onSalaryChange={this.updateSalary} // Передаем обработчик
                />
                <EmployersAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;
