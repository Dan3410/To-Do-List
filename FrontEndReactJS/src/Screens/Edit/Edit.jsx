import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./Edit.scss";
import { useState } from "react";
import { updateToDoInfo } from "../../Api/ToDoApi";
import {
  toDoDescriptionNotEmpty,
  toDoTitleNotEmpty,
} from "../../Utils/CheckToDos";

function Edit(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [newToDoInfo, setNewToDoInfo] = useState(
    location.state !== null ? location.state.toDo : null
  );

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    if (value.length <= 255) {
      const name = target.name;

      setNewToDoInfo({
        ...newToDoInfo,
        [name]: value,
      });
    }
  };

  const updateToDo = () => {
    updateToDoInfo(
      newToDoInfo.id,
      newToDoInfo.title,
      newToDoInfo.description,
      newToDoInfo.marked,
      location.state.folderId
    ).then(
      (response) => {
        if (response.status === 200) navigate(-1);
        if (response.status === 500) setErrorMessage("Error editing the To-Do");
      },
      () => setErrorMessage("Error editing the To-Do")
    );
  };

  const handleToDoChange = (e) => {
    e.preventDefault();
    try {
      toDoTitleNotEmpty(newToDoInfo.title);
      toDoDescriptionNotEmpty(newToDoInfo.description);
      updateToDo();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (location.state !== null)
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
            </div>
          </form>
          <button
            onClick={() => navigate(-1)}
            className="button-format edit__button"
          >
            <label>Cancel</label>
          </button>
          <div className="error-message-container">
            <label className="error-message-label">{errorMessage}</label>
          </div>
        </div>
      </div>
    );
  else return <Navigate to={"/toDos"} replace />;
}

export default Edit;
