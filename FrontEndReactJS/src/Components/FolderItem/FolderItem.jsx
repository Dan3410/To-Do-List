import { Link } from "react-router-dom";
import "./FolderItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function FolderItem(props) {
  const folder = props.folder;

  const deleteFolderItem = () => {
    props.deleteFolder(folder.id)
  };

  if (folder !== undefined)
    return (
      <div className="folder-format folder-change-color">
        <div className="folder-format--center-vertically">
          <label className="folder-label-format">{folder.title}</label>
          <FontAwesomeIcon
            icon={faTrash}
            className="folder-erase-format"
            onClick={deleteFolderItem}
            title="Delete Folder (this operation will delete all items inside the folder)"
          />
          <Link
            to={`/toDos/folders/${folder.title}`}
            state={{ folder: folder }}
          >
            <label className="folder-view-items-label"> View Items </label>
          </Link>
        </div>
      </div>
    );
  else return null;
}

export default FolderItem;
