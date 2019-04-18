import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;
    }

    schema = {
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number().label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .label("Rate")
    };

    doSubmit = () => {
        console.log("Movie Form Submit");

        saveMovie(this.state.data);

        this.props.history.push("/movies");
    };

    render() {
        const { match, history } = this.props;
        return (
            <div>
                <h1>MovieForm - {match.params.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title", "text")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate", "number")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
