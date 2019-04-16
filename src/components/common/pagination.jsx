import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null; // if total pages only has 1, than turn off the pagination

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const pageActive = page => (page === currentPage ? "page-item active" : "page-item");

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={pageActive(page)}>
                        <button className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    // propTypes 可以檢查 component 內的 porp type 是否正確
    // 需要再另外安裝 npm prop-types 元件
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
