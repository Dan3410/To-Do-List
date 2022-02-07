import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { getAllToDosFromFolder, addToDo, deleteToDo } from "../../Api/ToDoApi";
import ToDoItem from "../../Components/ToDoItem/ToDoItem";
import "./ToDos_List.scss";

function ToDos_List(props) {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState({
    title: "",
    description: "",
    marked: false,
    folderId: location.state.folder.id,
  });

  const deleteToDoFromDatabase = async (id) => {
    deleteToDo(id).then((response) => {
      setToDoList(toDoList.filter((toDo) => toDo.id !== id));
    });
  };

  const addNewToDoToDatabase = async () => {
    addToDo(newToDo).then((response) => {
      setToDoList([...toDoList, response.data]);
    });
  };

  const getToDosFromDatabase = useCallback(async () => {
    try {
      await getAllToDosFromFolder(location.state.folder.id).then((response) => {
        setToDoList(response.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  }, [location.state.folder.id]);

  const addNewToDoItem = (e) => {
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
      addNewToDoToDatabase();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setNewToDo({
        ...newToDo,
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
    getToDosFromDatabase();
  }, [getToDosFromDatabase]);

  return (
    <div className="todo-list-format">
      <label className="title-format">To-Do List</label>
      <div className="sub-title-container">
        <label className="sub-title-format"> Folders -{'>'} {location.state.folder.title}</label>
      </div>
      {toDoList.map((toDo) => {
        return (
          <ToDoItem
            toDo={toDo}
            key={toDo.id}
            deleteToDo={deleteToDoFromDatabase}
          ></ToDoItem>
        );
      })}
      <div className="todo-list__buttons">
        <form onSubmit={addNewToDoItem} className="list__add">
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
          <button
            type="submit"
            className="button-format todo-list__add__button"
          >
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
