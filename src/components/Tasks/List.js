import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeitem, edititem }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title, complete } = item;
        return (
          <div className="listitem1" key={id}>
            <p>{title}</p>
            <p>is complete : {complete.toString()}</p>
            <div>
              <button
                className="traed"
                type="button"
                onClick={() => edititem(id)}
              >
                <FaEdit />
              </button>
              <button
                className="traed"
                type="button"
                onClick={() => removeitem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
