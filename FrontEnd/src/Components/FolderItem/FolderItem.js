import { Link } from "react-router-dom";
import { useState } from "react";
import "./FolderItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function FolderItem(props) {
  const [isDeleted, setDeleted] = useState(false);
  const folder = props.folder;

  const deleteFolderItem = async () => {
    try {
      props.deleteFolder(folder.id);
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (folder !== undefined && !isDeleted)
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
          <Link to={`/${folder.title}`} state={{ folder: folder }}>
            <label className= "folder-view-items-label"> View Items </label>
          </Link>
        </div>
      </div>
    );
  else return null;
}

export default FolderItem;
