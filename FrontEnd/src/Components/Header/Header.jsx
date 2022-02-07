import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header(props) {
  return (
    <>
      <div className="header-format">
        <NavLink to={`/toDos`} className="header-button">
          <label className="header-button__label">To-Do List</label>
        </NavLink>
        {!props.isLoggedIn && (
          <NavLink to={`/`} className="header-button header-button--right">
            <label className="header-button__label">Login</label>
          </NavLink>
        )}
        {props.isLoggedIn && (
          <NavLink
            to={"/logout"}
            onClick={props.logoutUser}
            className="header-button header-button--right"
          >
            <label className="header-button__label">Logout</label>
          </NavLink>
        )}
      </div>
    </>
  );
}

export default Header;
