const Paginate = (sorted, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentMovies = sorted.slice(startIndex, endIndex);
    return currentMovies;
};

export default Paginate;
