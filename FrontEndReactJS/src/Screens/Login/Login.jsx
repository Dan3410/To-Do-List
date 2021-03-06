import "./Login.scss";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { correctPassword, passwordNotEmpty, usernameExists, userNotEmpty } from "../../Utils/CheckLoginForm";


function Login(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [typeInput, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const showText = () => {
    setType("text");
    setShowPassword(true);
  };

  const hideText = () => {
    setType("password");
    setShowPassword(false);
  };

  const login = (e) => {
    e.preventDefault();
    try {
      const username = form.username.trim();
      userNotEmpty(username);
      passwordNotEmpty(form.password);
      usernameExists(username);
      correctPassword(form.password);
      props.loginUser(username);
      navigate("/toDos", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

    return (
      <div className="login-form">
        <div className="login__title-container">
          <label className="title-format">Login</label>
        </div>
        <form onSubmit={login}>
          <div className="login-form__container">
            <label>Username:</label> <br />
            <input
              className="input-format login__input "
              type="text"
              name="username"
              value={form.username}
              placeholder={"Enter the username"}
              onChange={handleChange}
            />
          </div>
          <div className="login-form__container">
            <label>Password:</label>
            {!showPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={showText}
                className="login__input--secret"
              />
            ) : null}
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={hideText}
                className="login__input--secret"
              />
            ) : null}
            <br />
            <input
              className="input-format login__input"
              type={typeInput}
              name="password"
              value={form.password}
              placeholder={"Enter the password"}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button-format login__button">
            <label>Login</label>
          </button>
        </form>
        <div className="error-message-container">
          <label className="error-message-label">{errorMessage}</label>
        </div>
      </div>
    );
}

export default Login;
