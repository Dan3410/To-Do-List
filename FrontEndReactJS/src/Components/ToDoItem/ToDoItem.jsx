import { Link } from "react-router-dom";
import { useState } from "react";
import "./ToDoItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { updateToDoMark } from "../../Api/ToDoApi";

function ToDoItem(props) {
  const [toDo, setTodo] = useState(props.toDo);

  const handleMarkChange = (e) => {
    const target = e.target;
    const checked = target.checked;
    updateToDoMark(toDo.id, checked).then(
      (response) => {
        if (response.status === 200) setTodo({ ...toDo, marked: checked });
        if (response.status === 500)
          props.setErrorMessage("Error updating the mark");
      },
      () => props.setErrorMessage("Error updating the mark")
    );
  };

  const deleteItem = () => {
    props.deleteToDo(toDo.id);
  };

  if (toDo !== undefined)
    return (
      <div className="todo-format todo-change-color">
        <div className="todo-format--center-vertically">
          <input
            type="checkbox"
            id={toDo.id}
            checked={toDo.marked}
            className="todo-input-format"
            onChange={handleMarkChange}
          />
          <label className="todo-label-format">{toDo.title}</label>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="todo-erase-format"
            onClick={deleteItem}
            title="Delete ToDo"
          />
          <Link
            to={`/toDos/edit/${toDo.id}`}
            state={{ toDo: toDo, folderId: props.folderId }}
          >
            <FontAwesomeIcon
              icon={faPen}
              className="todo-edit-format"
              title="Edit ToDo"
            />
          </Link>
          <br />
          <label className="todo-description-format">{toDo.description}</label>
        </div>
      </div>
    );
  else return null;
}

export default ToDoItem;
