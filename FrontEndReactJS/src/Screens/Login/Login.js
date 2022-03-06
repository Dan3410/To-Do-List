import { connect } from "react-redux";
import { loginUser } from "../../Config/Redux/Actions/userActions";
import Login from "./Login.jsx";

function mapDispatchToProp(dispatch) {
  return { loginUser: (username) => dispatch(loginUser(username)) };
}
function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

const LoginScreen = connect(mapStateToProps, mapDispatchToProp)(Login);

export default LoginScreen;
