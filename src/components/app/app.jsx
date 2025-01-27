import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

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
            <div>
                <button onClick={this.nextYear}>{this.state.text}</button>
                {/* obj */}
                <h1>
                    {/* return func(name) */}
                    My name is {name}, surname - {surname}, age -{" "}
                    {this.state.years}
                </h1>
                <a href={link}>My profile</a>
            </div>
        );
    }
}

function App() {
    const data = [
        { name: "John C.", salary: 1200, increase: true, id: 1 },
        { name: "Alex M.", salary: 1800, increase: false, id: 2 },
        { name: "John C.", salary: 2600, increase: false, id: 3 },
    ];

    return (
        <div className="app">
            <AppInfo />
            {/* props */}
            <WhoAmI name="Alex" surname="Shepard" link="facebook.com" />
            {/* props */}
            <WhoAmI name="Clint" surname="Istvud" link="vk.com" />
            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>
            <EmployersList data={data} />
            <EmployersAddForm />
        </div>
    );
}

export default App;
