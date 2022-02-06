import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "./Edit.scss";
import { useState } from "react";
import { updateToDoInfo } from "../../Api/ToDoApi";

function Edit(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [newToDoInfo, setNewToDoInfo] = useState(location.state.toDo);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setNewToDoInfo({
      ...newToDoInfo,
      [name]: value,
    });
  };

  const updateToDo = async () => {
    await updateToDoInfo(
      newToDoInfo.id,
      newToDoInfo.title,
      newToDoInfo.description,
      newToDoInfo.marked
    );
    navigate("/", { replace: true });
  };

  const handleToDoChange = (e) => {
    e.preventDefault();
    try {
      if (newToDoInfo.title === "")
        throw new Error("The title field cannot be empty");
      if (newToDoInfo.description === "")
        throw new Error("The description field cannot be empty");
      updateToDo();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="edit-format">
      <label className="title-format"> Edit To-Do</label> <br />
      <div className="edit-container">
        <label>Editing Task "{location.state.toDo.title}"</label>
        <form className="edit-container__form" onSubmit={handleToDoChange}>
          <input
            className="input-format"
            onChange={handleChange}
            name="title"
            value={newToDoInfo.title}
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
