import React, { useState, useEffect } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/JeremyBarrera");
      if (response.status == 404) {
        await createUser();
        return;
      }
      const data = await response.json();
      setItems(data.todos)
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/JeremyBarrera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        await getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    if (e.key === "Enter" && text.trim() !== "") {
      try {
        const response = await fetch("https://playground.4geeks.com/todo/todos/JeremyBarrera", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "label": text,
            "is_done": false,
          }),
        });
        if (response.status === 201) {
          await getTodos();
          setText("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 204) {
        await getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="box">
      <input
        className="list"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={addItem}
        placeholder="What needs to be done?"
      />
      <ul className="list-container">
        {items.map((todo, index) => (
          <li key={index} className="list-item">
            {todo.label}
            <button className="fa-solid fa-x delete" onClick={() => deleteItem(todo.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="counter">Total Items: {items.length}</div>
    </div>
  );
};

export default Home;
