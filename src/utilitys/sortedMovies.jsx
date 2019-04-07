const SortedMovies = (path, direction, filteredMovies) => {
    console.log(path);
    let sortedMovies = [];
    if (path === "genre.name") {
        sortedMovies = filteredMovies.sort((a, b) =>
            a["genre"]["name"] > b["genre"]["name"] ? 1 : -1
        );
    } else {
        sortedMovies = filteredMovies.sort((a, b) => (a[path] > b[path] ? 1 : -1));
    }

    if (direction === false) {
        sortedMovies.reverse();
    }

    return sortedMovies;
};

export default SortedMovies;
