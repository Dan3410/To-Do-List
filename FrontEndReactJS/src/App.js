import "./App.scss";
import { Navigate, Route, Routes } from "react-router";
import ToDosList from "./Screens/ToDos_List/ToDosList.jsx";
import Edit from "./Screens/Edit/Edit.jsx";
import LoginScreen from "./Screens/Login/Login.js";
import HeaderScreen from "./Components/Header/Header.js";
import FolderListScreen from "./Screens/Folders_List/Folders_List.js";
import NotLoggedInWrapper from "./Components/NotLoggedInWrapper/NotLoggedIn.js";

function App() {
  return (
    <div className="App">
      <div className="content">
        <HeaderScreen />
        <Routes>
          {/* eslint-disable-next-line react/jsx-pascal-case*/}
          <Route exact path="/toDos/" element={<FolderListScreen />} />
          {/* eslint-disable-next-line react/jsx-pascal-case*/}
          <Route
            exact
            path="/toDos/folders/:folderTitle"
            element={<ToDosList />}
          />
          <Route exact path="/toDos/edit/:id" element={<Edit />} />
          <Route
            exact
            path="/"
            element={<NotLoggedInWrapper element={<LoginScreen />} />}
          />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
