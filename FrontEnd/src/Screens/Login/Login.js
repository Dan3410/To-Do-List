import { connect } from "react-redux";
import { loginUser } from "../../Config/Redux/Actions/userActions";
import Login from "./Login.jsx";

function mapDispatchToProp (dispatch){
    return {loginUser: (username) => dispatch(loginUser(username))}
}

const LoginScreen = connect(null, mapDispatchToProp) (Login);

export default LoginScreen