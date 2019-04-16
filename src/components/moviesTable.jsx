import React, { Component } from "react";
import Like from "./common/like.jsx";
import Table from "./common/table";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            // 為了在 title 上加入連結，我們在tableBody.jsx中傳入每個item的值，每當呼叫這裡的content就會將item的值傳給movie，並return後面的Link內容
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (
                movie //因為Like內的movie沒有被定義，所以將這個content寫成function，讓它在tableBody.jsx內可以被傳入值
            ) => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        },
        {
            key: "delete",
            content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm">
                    Delete
                </button>
            )
        }
    ];

    render() {
        const { currentMovies, onSort, sortColumn } = this.props;

        return (
            <Table
                columns={this.columns}
                data={currentMovies}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}
export default MoviesTable;
