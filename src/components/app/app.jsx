import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

function WhoAmI({ name, surname, link }) {
    // obj
    return (
        <div>
            <h1>
                {/* return func(name) */}
                My name is {name()}, surname - {surname}
            </h1>
            <a href={link}>My profile</a>
        </div>
    );
}

function App() {
    return (
        <div className="app">
            <AppInfo />
            {/* props */}
            <WhoAmI
                name={() => {
                    return "Alex";
                }}
                surname="Shepard"
                link="facebook.com"
            />
            {/* props */}
            <WhoAmI
                name={() => {
                    return "Clint";
                }}
                surname="Istvud"
                link="facebook.com"
            />
            <div className="search-panel">
                <SearchPanel />
                <AppFilter />
            </div>
            <EmployersList />
            <EmployersAddForm />
        </div>
    );
}

export default App;
