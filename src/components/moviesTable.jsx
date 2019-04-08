import React, { Component } from "react";
import Like from "./common/like.jsx";
import Table from "./common/table";
class MoviesTable extends Component {
    columns = [
        { path: "title", label: "Title" },
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
