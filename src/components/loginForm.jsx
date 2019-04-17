import React, { Component } from "react";
import Input from "./common/input";
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
        const { data, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                {/* 在 form submit 的時候，網頁會整個重新 render，為了避免這樣的狀況，我們會先 preventDefault 然後再重新 route 到新頁面 */}
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={data.username}
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={data.password}
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button
                        // 每次在輸入表單的時候都會從 this.validate() return 值
                        //如果表單驗證無誤會為傳 null（null 相對等於 false），如果驗證錯誤會回傳error的資訊，就會等於true，所以button 的 disable 會被開啟
                        disabled={this.validate()}
                        className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
