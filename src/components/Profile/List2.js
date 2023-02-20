import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Profile from "./Profile";

const List2 = ({ items, removeitem, edititem }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      {items.map((item) => {
        const { id, title, age, email, password } = item;
        return (
          <div className="listitempro1" key={id}>
            <p>name : {title}</p>
            <p>age : {age}</p>
            <p>email : {email}</p>
            <p>password : {password}</p>
            <div>
              <button
                className="traed1"
                type="button"
                onClick={() => {
                  edititem(id);
                  setOpenForm(true);
                }}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List2;
