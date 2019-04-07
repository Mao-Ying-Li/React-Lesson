const Paginate = (sortedMovies, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentMovies = sortedMovies.slice(startIndex, endIndex);
    return currentMovies;
};

export default Paginate;
