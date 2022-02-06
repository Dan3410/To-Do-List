import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <>
      <div className="header-format">
        <NavLink to={``} className="header-button">
          <label className="header-button__label">To-Do List</label>
        </NavLink>
        <NavLink to={`/login`} className="header-button">
          <label className="header-button__label">Login</label>
        </NavLink>
      </div>
    </>
  );
}

export default Header;
