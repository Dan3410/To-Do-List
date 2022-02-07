import { useState, useEffect } from "react";
import { getAllFolders, addFolder, deleteFolder } from "../../Api/FolderApi";
import FolderItem from "../../Components/FolderItem/FolderItem";
import "./Folders_List.scss";

function Folder_List(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [folderList, setFolderList] = useState([]);
  const [newFolder, setNewFolder] = useState({
    title: "",
  });

  const addNewFolderToDatabase = async () => {
    addFolder(newFolder).then((response) => {
      setFolderList([...folderList, response.data]);
    });
  };

  const deleteFolderFromDatabase = async (id) => {
    deleteFolder(id).then((response) => {
      setFolderList(folderList.filter((folder) => folder.id !== id));
    });
  };

  const getFoldersFromDatabase = async () => {
    try {
      getAllFolders().then((response) => {
        setFolderList(response.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const addNewFolderItem = (e) => {
    e.preventDefault();
    try {
      if (newFolder.title === "")
        throw new Error("The title field cannot be empty");
      const indexWithSameTitle = folderList
        .map((folder) => folder.title)
        .indexOf(newFolder.title);
      if (indexWithSameTitle !== -1)
        throw new Error("The is already a Folder with that title");
      addNewFolderToDatabase();
      setErrorMessage("");
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
    if (value <= 255) {
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
