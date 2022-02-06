import { useState, useEffect } from "react";
import { getAllToDos, addToDo} from "../../Api/ToDoApi";
import ToDoItem from "../../Components/ToDoItem/ToDoItem";
import "./ToDos_List.scss";

function ToDos_List() {
  const [errorMessage, setErrorMessage] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState({
    title: "",
    description: "",
    marked: false,
  });

  const getToDos = async () => {
    try {
      getAllToDos().then((response) => {
        setToDoList(response.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    try {
      if (newToDo.title === "")
        throw new Error("The title field cannot be empty");
      if (newToDo.description === "")
        throw new Error("The description field cannot be empty");
      const indexWithSameTitle = toDoList
        .map((toDo) => toDo.title)
        .indexOf(newToDo.title);
      if (indexWithSameTitle !== -1)
        throw new Error("The is already a ToDo with that title");
      setToDoList([...toDoList, newToDo]);
      addToDo(newToDo);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setNewToDo({
        title: "",
        description: "",
        marked: false,
      });
    }
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

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <div className="list-format">
      <label className="title-format">To-Do List</label>
      {toDoList.map((toDo) => {
        return (
          <ToDoItem
            toDo={toDo}
            key={toDo.id}
          ></ToDoItem>
        );
      })}
      <div className="list__buttons">
        <form onSubmit={addNewTodo} className="list__add">
          <div>
            <input
              type="text"
              className="input-format"
              name="title"
              value={newToDo.title}
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
