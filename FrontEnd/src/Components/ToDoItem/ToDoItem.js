import { Link } from "react-router-dom";
import { useState } from "react";
import "./ToDoItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { updateToDoInfo, deleteToDo } from "../../Api/ToDoApi";

function ToDoItem(props) {
  const [isDeleted, setDeleted] = useState(false);
  const [toDo, setTodo] = useState(props.toDo);

  const handleMarkChange = (e) => {
    const target = e.target;
    const checked = target.checked
    updateToDoInfo(toDo.id, toDo.title, toDo.description, checked);
    setTodo({ ...toDo, marked: checked });
  };

  const deleteItem = async () => {
    await deleteToDo(toDo.id);
    setDeleted(true)
  };

  if (toDo !== undefined && !isDeleted)
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
          <Link to={`/edit/${toDo.id}`} state={{ toDo: toDo }}>
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
