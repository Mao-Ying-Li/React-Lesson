import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable.jsx";
import Pagination from "./common/pagination";
import Paginate from "../utilitys/paginate.jsx";
import ListGenre from "../components/common/listGenre.jsx";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        // selectedGenre: [],
        pageSize: 4, //show the movie per page
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        const genres = [{ name: "All Genre", _id: "" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres: genres });
    }

    handleLiked = movie => {
        const movies = [...this.state.movies]; //複製原本 state 中的 movies，因為在react中我們不直接修改 state 中的內容
        const index = movies.indexOf(movie); //查詢被 onClick 的 movie 位置
        // movies[index] = { ...movies[index] }; //將 movies index 中的資料換成新的
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handleDelete = movie => {
        //刪除電影功能
        const newMovies = this.state.movies.filter(m => m._id !== movie._id); // filter 會重新儲存物件內容不等於 movie._id 的物件
        this.setState({
            movies: newMovies
        });
    };

    handlePageChange = pageNum => {
        this.setState({ currentPage: pageNum });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        console.log("onClick");
        this.setState({ sortColumn });
    };

    render() {
        const { length: count } = this.state.movies; //將 this.state.movie.length 轉換成左方ES6敘述，並將變數 length 轉換為 count
        const {
            pageSize,
            currentPage,
            movies,
            selectedGenre,
            genres,
            sortColumn
        } = this.state;

        if (count === 0) {
            //使用上方定義的變數 count
            return <p>There's no movies in database.</p>;
        }

        const filteredMovies = //選取分類時的影片清單
            selectedGenre && selectedGenre._id
                ? movies.filter(m => m.genre._id === selectedGenre._id)
                : movies;

        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        const currentMovies = Paginate(sorted, currentPage, pageSize);

        return (
            // 使用 React.Fragment 包起 child element 就不會顯示多餘的 div
            <div className="row">
                <div className="col-3">
                    <ListGenre
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>Showing {filteredMovies.length} movies in the database.</p>
                    <MoviesTable
                        currentMovies={currentMovies}
                        onLike={this.handleLiked}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={filteredMovies.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
