import React from "react";
import TableHeader from "./tableHeader.jsx";
import TableBody from "./tableBody.jsx";

const Table = ({ columns, sortColumn, onSort, data }) => {
    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export default Table;
