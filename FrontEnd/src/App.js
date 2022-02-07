import "./App.scss";
import { Navigate, Route, Routes } from "react-router";
import Folder_List from "./Screens/Folders_List/Folders_List";
import ToDos_List from "./Screens/ToDos_List/ToDos_List";
import Edit from "./Screens/Edit/Edit";
import LoginScreen from "./Screens/Login/Login.js";
import HeaderScreen from "./Components/Header/Header.js";

function App() {
  return (
    <div className="App">
      <div className="content">
        <HeaderScreen />
        <Routes>
          {/* eslint-disable-next-line react/jsx-pascal-case*/}
          <Route exact path="/" element={<Folder_List />} />
          {/* eslint-disable-next-line react/jsx-pascal-case*/}
          <Route exact path="/folders/:folderTitle" element={<ToDos_List />} />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
