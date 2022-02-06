import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router";

const user = { username: "user", password: "password" };

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    try {
      if (form.username === "") throw new Error("You must enter the username");
      if (form.password === "") throw new Error("You must enter the password");
      if (form.username !== user.username) throw new Error("Invalid username")
      if (form.password !== user.password)
        throw new Error("Incorrect password");
      navigate("/", { replace: true });
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
            className="input-format login__input"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="login-form__container">
          <label>Password:</label> <br />
          <input
            className="input-format login__input"
            type="text"
            name="password"
            value={form.password}
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
