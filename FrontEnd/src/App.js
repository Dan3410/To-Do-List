import "./App.scss";
import { Route, Routes } from "react-router";
import Header from "./Components/Header/Header.js";
import ToDos_List from "./Screens/ToDos_List/ToDos_List";
import Edit from "./Screens/Edit/Edit";
import Login from "./Screens/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="content">
      <Header />
      <Routes>
        {/* eslint-disable-next-line react/jsx-pascal-case*/}
        <Route exact path="/" element={<ToDos_List/>} />
        <Route exact path="/edit/:id" element={<Edit/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
