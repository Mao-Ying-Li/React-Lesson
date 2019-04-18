import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                {/* 在 form submit 的時候，網頁會整個重新 render，為了避免這樣的狀況，我們會先 preventDefault 然後再重新 route 到新頁面 */}
                <form onSubmit={this.handleSubmit}>
                    {/* renderInput(field of name, field of label, field of type) you can find in form.jsx */}
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
