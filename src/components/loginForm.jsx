import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
    state = {
        account: {
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

    validate = () => {
        // Joi 的 validate 功能 validate(value,schema,[function],[callback])
        // abortEarly default 是true，在遇到第一個error時就會停止validate，如果設定false，會在全部驗證完後才停止
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.account, this.schema, option);
        console.log(result);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        //這裡 errors[item.path[0]] = "username" 或 "password"      可以查看 console.log(result)
        return errors;

        //這是土炮的作法
        // const errors = {};
        // const { account } = this.state;
        // if (account.username.trim() === "") errors.username = "Username is required.";
        // if (account.password.trim() === "") errors.password = "Password is required.";

        // return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        // console.log(errors);
        this.setState({ errors: errors || {} }); //如果 errors == null 則show empty object {}
        if (errors) return; //如果有 error 就不再讓程式繼續往下

        console.log("submitted"); //如果沒有 error 就送出表單
    };

    validateProperty = input => {
        //input.name & input.value
        const { name, value } = input;
        if (name === "username") {
            if (value.trim() === "") return "Username is require.";
        }
        if (name === "password") {
            if (value.trim() === "") return "Password is require.";
        }
    };

    handleChange = ({ currentTarget: input }) => {
        // "e.currentTarget" distructure to "input"

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        /** 在 js 中，如果要讓 object 更加動態，我們可以使用 [] 來動態加入 key，上例我們已經在 input 元件中加入了 name attribute
        這樣可以在鍵入任何數值的時候監聽 e.currentTarget.name 來動態新增 e.currentTarget.value */
        this.setState({ account, errors });
    };

    render() {
        const { account, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                {/* 在 form submit 的時候，網頁會整個重新 render，為了避免這樣的狀況，我們會先 preventDefault 然後再重新 route 到新頁面 */}
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={account.username}
                        onChange={this.handleChange}
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        label="Password"
                        value={account.password}
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
