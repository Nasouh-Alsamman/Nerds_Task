import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getlocalstorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function Tasks() {
  const [name, setName] = useState("");
  const [checkedOne, setCheckedOne] = useState(false);
  const [list, setList] = useState(getlocalstorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  const handleSubment = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "error", "Please Add Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name, complete: checkedOne };
          }
          return item;
        })
      );
      setName("");
      setCheckedOne(false);
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "item changed");
    } else {
      showAlert(true, "success", "Done");
      const newitem = {
        id: new Date().getTime().toString(),
        title: name,
        complete: checkedOne,
      };
      setList([...list, newitem]);
      setName("");
      setCheckedOne(false);
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearlist = () => {
    showAlert(true, "error", "All List Deleted");
    setList([]);
  };
  const removeitem = (id) => {
    showAlert(true, "error", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const edititem = (id) => {
    const specificitem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificitem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <main className="main">
      <section className="container">
        <div className="form">
          <form className="formhold" onSubmit={handleSubment}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h3>Tasks</h3>
            <div>
              <div className="fff">
                <input
                  type="text"
                  placeholder="add task"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="checkbox">
                  <input
                    className="check"
                    type="checkbox"
                    checked={checkedOne}
                    onChange={handleChangeOne}
                  />
                  Complete
                </label>
              </div>

              <button>{isEditing ? "Edit" : "Create new task"}</button>
            </div>
          </form>
        </div>

        {list.length > 0 && (
          <div className="listitem">
            <List items={list} removeitem={removeitem} edititem={edititem} />
            <button className="clear_items" onClick={clearlist}>
              clear items
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Tasks;
