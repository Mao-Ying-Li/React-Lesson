import React from "react";

const ListGenre = props => {
    const { items, onItemSelect, selectedItem, textProperty, valueProperty } = props;

    return (
        <ul className="list-grop">
            {items.map(item => (
                <li
                    key={item[valueProperty]}
                    style={{ cursor: "pointer" }}
                    className={
                        item === selectedItem
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    onClick={() => onItemSelect(item)}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
};

ListGenre.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGenre;
