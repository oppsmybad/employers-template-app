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
        this.state = {
            data: [
                { name: "John C.", salary: 1200, increase: true, id: 1 },
                { name: "Alex M.", salary: 1800, increase: false, id: 2 },
                { name: "John C.", salary: 2600, increase: false, id: 3 },
            ],
        };

        this.maxId = 4;
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

    render() {
        return (
            <div className="app">
                <AppInfo />
                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>
                <EmployersList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                />
                <EmployersAddForm />
            </div>
        );
    }
}

export default App;
