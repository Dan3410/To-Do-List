import { useState, useEffect } from "react";
import { getAllFolders, addFolder, deleteFolder } from "../../Api/FolderApi";
import FolderItem from "../../Components/FolderItem/FolderItem";
import {
  folderAlreadyExists,
  folderTitleNotEmpty,
} from "../../Utils/CheckFolder";
import "./Folders_List.scss";

function Folder_List(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [folderList, setFolderList] = useState([]);
  const [newFolder, setNewFolder] = useState({
    title: "",
  });

  const addNewFolderToDatabase = () => {
    addFolder(newFolder).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          setFolderList([...folderList, response.folder]);
          setErrorMessage("");
        }
        if (response.status === 500) setErrorMessage("Error creating folder");
      },
      (response) => setErrorMessage(response.message)
    );
  };

  const deleteFolderFromDatabase = (id) => {
    deleteFolder(id).then(
      (response) => {
        if (response.status === 200) {
          setFolderList(folderList.filter((folder) => folder.id !== id));
        }
        if (response.status === 500) setErrorMessage("Error deleting folder");
      },
      (response) => setErrorMessage(response.message)
    );
  };

  const getFoldersFromDatabase = () => {
    getAllFolders().then(
      (response) => {
        if (response.status === 200) setFolderList(response.folders);
        if (response.status === 500)
          setErrorMessage("Error retrieving folders");
      },
      (error) => setErrorMessage("Error retrieving folders")
    );
  };

  const addNewFolderItem = (e) => {
    e.preventDefault();
    try {
      folderTitleNotEmpty(newFolder.title);
      folderAlreadyExists(newFolder.title, folderList);
      addNewFolderToDatabase();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setNewFolder({
        title: "",
        description: "",
        marked: false,
      });
    }
  };

  const handleChangeNewFolder = (e) => {
    const target = e.target;
    const value = target.value;
    if (value.length <= 255) {
      const name = target.name;
      setNewFolder({
        ...newFolder,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    getFoldersFromDatabase();
  }, []);

  return (
    <div className="folder-list-format">
      {props.isLoggedIn ? (
        <>
          <label className="title-format">To-Do List</label>
          <br />
          <div className="sub-title-container">
            <label className="sub-title-format"> Folders </label>
          </div>{" "}
          <div className="folder-list__items-container">
            {folderList.map((folder) => {
              return (
                <FolderItem
                  folder={folder}
                  key={folder.id}
                  deleteFolder={deleteFolderFromDatabase}
                  setErrorMessage={setErrorMessage}
                ></FolderItem>
              );
            })}
          </div>
          <div className="folder-list__buttons">
            <form onSubmit={addNewFolderItem} className="folder-list__add">
              <input
                type="text"
                className="input-format"
                name="title"
                value={newFolder.title}
                onChange={handleChangeNewFolder}
                placeholder="Insert new Folder's Title"
              />
              <button
                type="submit"
                className="button-format folder-list__add__button"
              >
                <label>Create folder</label>
              </button>
            </form>
            <div className="error-message-container">
              <label className="error-message-label">{errorMessage}</label>
            </div>
          </div>
        </>
      ) : (
        <label className="not-logged-label"> You have to login first </label>
      )}
    </div>
  );
}

export default Folder_List;
