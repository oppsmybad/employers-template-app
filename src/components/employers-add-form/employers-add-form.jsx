import { Component } from "react";

// import "./employers-add-form.css";

// import scss file
// WARNING! download sass module to use scss
import "./employers-add-form.scss";

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: "",
        };
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { name, salary } = this.state;

        // Проверка на пустые строки и зарплату <= 0
        if (
            !name.trim() ||
            !salary.trim() ||
            isNaN(salary) ||
            Number(salary) <= 0
        ) {
            alert("Введите корректные данные сотрудника!");
            return;
        }
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: "",
            salary: "",
        });
    };

    render() {
        let { name, salary } = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange}
                    />
                    <input
                        type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}
                    />

                    <button type="submit" className="btn btn-outline-light">
                        Добавить
                    </button>
                </form>
            </div>
        );
    }
}

export default EmployersAddForm;
