import React, { Component } from "react";

class Input extends Component {
    // 在 react 可以創造 ref 來連結 DOM 元素
    username = React.createRef();
    // 在 component mount之前就 focus 在 username 這個 DOM 元素上
    componentDidMount = () => {
        if (this.props.name === "username") this.username.current.focus(); //檢查 loginForm input name 的值是不是符合
    };

    render() {
        const { name, label, value, onChange, error } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input
                    // autoFocus //html5 有 autofocus 這個 attribute 可以在網頁一開始就 focus 在 這個 input 表單上
                    ref={this.username}
                    type="text"
                    className="form-control"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {/* if error == true , than show the div otherwise disable div */}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Input;
