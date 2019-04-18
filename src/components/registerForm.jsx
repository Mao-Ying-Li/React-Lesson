import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: "",
            phone: "",
            email: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required(),
        password: Joi.string()
            .min(6)
            .required(),
        name: Joi.string().required(),
        phone: Joi.optional(),
        email: Joi.string()
            .email()
            .required()
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* renderInput(field of name, field of label, field of type) you can find in form.jsx */}
                    {this.renderInput("username", "Username", "text")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name", "text")}
                    {this.renderInput("phone", "Phone", "number")}
                    {this.renderInput("email", "E-mail", "email")}
                    {this.renderButton("Regist")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
