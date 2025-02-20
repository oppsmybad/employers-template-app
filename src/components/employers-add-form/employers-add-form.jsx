import { Component } from "react";
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
        const { name, value } = e.target;

        if (name === "name") {
            const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

            if (!regex.test(value) && value !== "") {
                return;
            }
        }

        this.setState({
            [name]: value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { name, salary } = this.state;

        if (
            !name.trim() ||
            !salary.trim() ||
            isNaN(salary) ||
            Number(salary) <= 0
        ) {
            alert("Введите корректные данные сотрудника!");
            return;
        }
        this.props.onAdd(name, parseInt(salary, 10));
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
                        placeholder="З/П в $? (только числа)"
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
