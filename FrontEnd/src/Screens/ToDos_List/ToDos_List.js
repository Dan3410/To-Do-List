import { useState } from "react";
import ToDoItem from "../../Components/ToDoItem/ToDoItem";
import "./ToDos_List.scss";

export let toDos_List = [
  {
    id: 1,
    label: "Buy groceries",
    description: "There are lots of things to buy",
    marked: false,
  },
  {
    id: 2,
    label: "Start a new project",
    description: "Something simple",
    marked: false,
  },
];

function ToDos_List() {
  const [errorMessage, setErrorMessage] = useState("");
  const [newToDo, setNewToDo] = useState({
    id: toDos_List.length + 1,
    label: "",
    description: "",
    marked: false,
  });

  const addNewTodo = (e) => {
    e.preventDefault();
    try {
      if (newToDo.label === "")
        throw new Error("The title field cannot be empty");
      if (newToDo.description === "")
        throw new Error("The description field cannot be empty");
      const indexWithSameTitle = toDos_List
        .map((toDo) => toDo.label)
        .indexOf(newToDo.label);
      console.log(indexWithSameTitle);
      if (indexWithSameTitle !== -1)
        throw new Error("The is already a ToDo with that title");
      toDos_List = [...toDos_List, newToDo];
      setNewToDo({
        id: newToDo.id + 1,
        label: "",
        description: "",
        marked: false,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const deleteTodo = (id) => {
    toDos_List = toDos_List.filter((ToDo) => ToDo.id !== id);
  };

  const handleMarkChange = (e) => {
    const target = e.target;
    const value = target.value;
    const id = Number(target.id);

    const markChangeIndex = toDos_List.map((toDo) => toDo.id).indexOf(id);
    const newPendingToDoList = toDos_List;
    newPendingToDoList[markChangeIndex].marked = value;

    toDos_List = newPendingToDoList;
  };

  const handleChangeNewTodo = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewToDo({
      ...newToDo,
      [name]: value,
    });
  };

  return (
    <div className="list-format">
      <label className="title-format">To-Do List</label>
      {toDos_List.map((ToDo) => {
        return (
          <ToDoItem
            ToDo={ToDo}
            key={ToDo.id}
            deleteToDo={deleteTodo}
            markChange={handleMarkChange}
          ></ToDoItem>
        );
      })}
      <div className="list__buttons">
        <form onSubmit={addNewTodo} className="list__add">
          <div>
            <input
              type="text"
              className="input-format"
              name="label"
              value={newToDo.label}
              onChange={handleChangeNewTodo}
              placeholder="Insert new ToDo's Title"
            />
            <input
              type="text"
              className="input-format"
              name="description"
              value={newToDo.description}
              onChange={handleChangeNewTodo}
              placeholder="Insert new ToDo's Description"
            />
          </div>
          <button type="submit" className="button-format list__add__button">
            <label>Add</label>
          </button>
        </form>
        <div className="error-message-container">
          <label className="error-message-label">{errorMessage}</label>
        </div>
      </div>
    </div>
  );
}

export default ToDos_List;
