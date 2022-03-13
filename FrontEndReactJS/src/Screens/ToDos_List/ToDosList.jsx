import { useState, useEffect, useCallback } from "react";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getAllToDosFromFolder, addToDo, deleteToDo } from "../../Api/ToDoApi";
import ToDoItem from "../../Components/ToDoItem/ToDoItem";
import "./ToDosList.scss";

function ToDos_List(props) {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState(
    location.state !== null
      ? {
          title: "",
          description: "",
          marked: false,
          folderId: location.state.folder.id,
        }
      : {}
  );

  const deleteToDoFromDatabase = (id) => {
    deleteToDo(id).then(
      () => setToDoList(toDoList.filter((toDo) => toDo.id !== id)),
      () => setErrorMessage("Error deleting the ToDo")
    );
  };

  const addNewToDoToDatabase = () => {
    addToDo(newToDo).then(
      (response) => {
        if (response.status === 201) setToDoList([...toDoList, response.toDo]);
        if (response.status === 500)
          setErrorMessage("Error creating the To-Do");
      },
      () => setErrorMessage("Error creating the To-Do")
    );
  };

  const getToDosFromDatabase = useCallback(() => {
    if (location.state !== null) {
      getAllToDosFromFolder(location.state.folder.id).then(
        (response) => {
          if (response.status === 200) setToDoList(response.toDos);
          if (response.status === 500)
            setErrorMessage("Error retrieving ToDos");
        },
        () => setErrorMessage("Error retrieving ToDos")
      );
    }
  }, [location.state]);

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
    if (value.length <= 255) {
      const name = target.name;

      setNewToDo({
        ...newToDo,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    getToDosFromDatabase();
  }, [getToDosFromDatabase]);

  if (location.state !== null)
    return (
      <div className="todo-list-format">
        <label className="title-format">To-Do List</label>
        <div className="sub-title-container">
          <Link to={"/toDos"} style={{ textDecoration: "none" }}>
            <label className="sub-title-format sub-title-format--pointer">
              Folders
            </label>
          </Link>{" "}
          <label className="sub-title-format">
            -{">"} {location.state.folder.title}
          </label>
        </div>
        <div className="todo-list__items-container">
          {toDoList.map((toDo) => {
            return (
              <ToDoItem
                toDo={toDo}
                key={toDo.id}
                deleteToDo={deleteToDoFromDatabase}
                folderId={location.state.folder.id}
                setErrorMessage={setErrorMessage}
              ></ToDoItem>
            );
          })}
        </div>
        <div className="todo-list__buttons">
          <form onSubmit={addNewToDoItem} className="todo-list__add">
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
  else return <Navigate to={"/toDos"} replace />;
}

export default ToDos_List;
