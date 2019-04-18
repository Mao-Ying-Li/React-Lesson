import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/notfound" component={NotFound} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
