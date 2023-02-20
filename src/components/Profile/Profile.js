import React, { useState, useEffect } from "react";
import List2 from "./List2";
import Alert from "./Alert";

const getlocalstorage = () => {
  let list2 = localStorage.getItem("list2");
  if (list2) {
    return JSON.parse(localStorage.getItem("list2"));
  } else {
    return [];
  }
};

function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [list2, setList2] = useState(getlocalstorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [openform, setOpenform] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubment = (e) => {
    e.preventDefault();
    if (!name && !age && !email && !password) {
      showAlert(true, "error", "Please Add Value");
    } else if (name && age && email && password && isEditing) {
      setList2(
        list2.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
              age: age,
              email: email,
              password: password,
            };
          }
          return item;
        })
      );
      setName("");
      setAge("");
      setEmail("");
      setPassword("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "item changed");
    } else {
      showAlert(true, "success", "Done");
      const newitem = {
        id: new Date().getTime().toString(),
        title: name,
        age: age,
        email: email,
        password: password,
      };
      setList2([...list2, newitem]);
      setName("");
      setAge("");
      setEmail("");
      setPassword("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearlist2 = () => {
    showAlert(true, "error", "All List Deleted");
    setList2([]);
  };
  const removeitem = (id) => {
    showAlert(true, "error", "item removed");
    setList2(list2.filter((item) => item.id !== id));
  };
  const edititem = (id) => {
    const specificitem = list2.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificitem.title);
    setAge(specificitem.age);
    setEmail(specificitem.email);
    setPassword(specificitem.password);
  };
  useEffect(() => {
    localStorage.setItem("list2", JSON.stringify(list2));
  }, [list2]);

  return (
    <main className="main">
      <section className="container">
        <div className="form">
          <form onSubmit={handleSubment}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list2={list2} />
            )}

            <h3>profile </h3>
            <div>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button>{isEditing ? "Edit" : "Submet"}</button>
            </div>
          </form>
        </div>

        {list2.length > 0 && (
          <div className="listitempro">
            <List2
              items={list2}
              removeitem={removeitem}
              edititem={edititem}
              setOpenform={setOpenform}
            />
            <button className="clear_items" onClick={clearlist2}>
              clear information
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
