import { Component } from "react";

// import css into react
import "styled-components";
import styled from "styled-components";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

// css styles (styled-css)
const EmpItem = styled.div`
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

    /* nested styles */
    a {
        display: block;
        margin: 10px 0 10px 0;
        color: ${(props) => (props.active ? "orange" : "black")};
    }
    input {
        display: block;
        margin-top: 10px;
    }
`;

// css styles (styled-css)
const StyledH1 = styled.h1`
    font-size: 36px;
    background-color: yellow;
`;

// const Header = styled.h2`
//     font-size: 22px;
// `;

export const Button = styled.button`
    display: block;
    padding: 5px 15px;
    background-color: gold;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

//
class WhoAmI extends Component {
    // use props from Component
    constructor(props) {
        super(props);
        // create states
        this.state = {
            years: 27,
            text: "+++",
        };
    }
    // arrow function
    nextYear = () => {
        // use callback
        this.setState((state) => ({
            // return new state
            years: state.years + 1,
        }));
    };
    render() {
        const { name, surname, link } = this.props;
        return (
            // div from styled-css
            <EmpItem active>
                {/* // use styled h1 */}
                <StyledH1>
                    <h1>
                        {/* return func(name) */}
                        My name is {name}, surname - {surname}, age -{" "}
                        {this.state.years}
                    </h1>
                </StyledH1>
                <a href={link}>My profile</a>
                <br></br>
                {/* // use styled button */}
                <Button style={{ marginTop: 20 }} onClick={this.nextYear}>
                    {this.state.text}
                </Button>
            </EmpItem>
        );
    }
}

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

                {/* // */}
                <WhoAmI name="Alex" surname="Shepard" link="facebook.com" />
                <WhoAmI name="Clint" surname="Istvud" link="vk.com" />

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
