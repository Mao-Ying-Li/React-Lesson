import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/fakeMovieService";

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

    schema = {
        _id: Joi.string(), //因為在點擊電影名稱後，電影_id會被setstate 進 data 中，在 form.jsx 中的 validate() 就會因為檢查不到 id 而出現錯誤，所以我們需要在這裡加上 id 的 schema
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Rate")
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) this.props.history.replace("/notfound");

        this.setState({ data: this.mapToViewModule(movie) });
    }

    mapToViewModule = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    render() {
        const { match } = this.props;
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
