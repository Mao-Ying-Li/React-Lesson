import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        data: {},
        error: {}
    };

    validate = () => {
        // Joi 的 validate 功能 validate(value,schema,[function],[callback])
        // abortEarly default 是true，在遇到第一個error時就會停止validate，如果設定false，會在全部驗證完後才停止
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, option);
        console.log(result);
        if (!result.error) return null; //result.error 在表單驗證都正確的時候 value 就會是 null
        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        //這裡 errors[item.path[0]] = "username" 或 "password"      可以查看 console.log(result)
        return errors;

        //這是土炮的作法
        // const errors = {};
        // const { data } = this.state;
        // if (data.username.trim() === "") errors.username = "Username is required.";
        // if (data.password.trim() === "") errors.password = "Password is required.";

        // return Object.keys(errors).length === 0 ? null : errors;
    };

    validateProperty = input => {
        const { name, value } = input;
        const obj = { [name]: value }; //動態抓取要 validate 的物件
        const schema = { [name]: this.schema[name] }; //動態取得 this.schema
        const { error } = Joi.validate(obj, schema, { abortEarly: true });
        return error ? error.details[0].message : null;

        // //input.name & input.value
        // const { name, value } = input;
        // if (name === "username") {
        //     if (value.trim() === "") return "Username is require.";
        // }
        // if (name === "password") {
        //     if (value.trim() === "") return "Password is require.";
        // }
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        // console.log(errors);
        this.setState({ errors: errors || {} }); //如果 errors == null 則show empty object {}
        if (errors) return; //如果有 error 就不再讓程式繼續往下

        console.log("submitted"); //如果沒有 error 就送出表單
    };

    handleChange = ({ currentTarget: input }) => {
        // "e.currentTarget" distructure to "input"

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        /** 在 js 中，如果要讓 object 更加動態，我們可以使用 [] 來動態加入 key，上例我們已經在 input 元件中加入了 name attribute
        這樣可以在鍵入任何數值的時候監聽 e.currentTarget.name 來動態新增 e.currentTarget.value */
        this.setState({ data, errors });
    };
}

export default Form;
