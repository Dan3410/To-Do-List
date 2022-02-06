import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "./Edit.scss";
import { toDos_List } from "../ToDos_List/ToDos_List";
import { useState } from "react";

function Edit(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const toDoIndex = toDos_List
    .map((toDo) => toDo.id)
    .indexOf(location.state.ToDo.id);
  const [newToDoInfo, setNewToDoInfo] = useState({
    label: toDos_List[toDoIndex].label,
    description: toDos_List[toDoIndex].description,
  });
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewToDoInfo({
      ...newToDoInfo,
      [name]: value,
    });
  };

  const handleToDoChange = (e) => {
    e.preventDefault();
    try {
      if (newToDoInfo.label === "")
        throw new Error("The title field cannot be empty");
      if (newToDoInfo.description === "")
        throw new Error("The description field cannot be empty");
      toDos_List[toDoIndex].label = newToDoInfo.label;
      toDos_List[toDoIndex].description = newToDoInfo.description;
      console.log(toDos_List);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="edit-format">
      <label className="title-format"> Edit To-Do</label> <br />
      <div className="edit-container">
        <label>Editing Task "{location.state.ToDo.label}"</label>
        <form className="edit-container__form" onSubmit={handleToDoChange}>
          <input
            className="input-format"
            onChange={handleChange}
            name="label"
            value={newToDoInfo.label}
            placeholder="Insert the To-Do's new title"
          />
          <input
            className="input-format"
            onChange={handleChange}
            name="description"
            value={newToDoInfo.description}
            placeholder="Insert the To-Do's new description"
          />
          <div>
            <button type="submit" className="button-format edit__button">
              <label>Save</label>
            </button>
            <NavLink to="/">
              <button className="button-format edit__button">
                <label>Cancel</label>
              </button>
            </NavLink>
          </div>
        </form>
        <div className="error-message-container">
          <label className="error-message-label">{errorMessage}</label>
        </div>
      </div>
    </div>
  );
}

export default Edit;
