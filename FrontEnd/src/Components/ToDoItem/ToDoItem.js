import { Link } from "react-router-dom";
import { useState } from "react";
import "./ToDoItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ToDoItem(props) {
  const [isDeleted, setDeleted] = useState(false);

  function deleteToDo() {
    props.deleteToDo(props.ToDo.id);
    setDeleted(true);
  }
  if (props.ToDo !== undefined && !isDeleted)
    return (
      <div className="todo-format todo-change-color">
        <div className="todo-format--center-vertically">
          <input
            type="checkbox"
            id={props.ToDo.id}
            value={props.ToDo.marked}
            className="todo-input-format"
            onClick={props.markChange}
          />
          <label className="todo-label-format">{props.ToDo.label}</label>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="todo-erase-format"
            onClick={deleteToDo}
            title="Delete ToDo"
          />
          <Link to={`/edit/${props.ToDo.id}`} state={{ ToDo: props.ToDo }}>
            <FontAwesomeIcon
              icon={faPen}
              className="todo-edit-format"
              title="Edit ToDo"
            />
          </Link>
          <br/>
          <label className="todo-description-format">{props.ToDo.description}</label>

        </div>
      </div>
    );
  else return null;
}

export default ToDoItem;
