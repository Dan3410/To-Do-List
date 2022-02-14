import { connect } from "react-redux";
import { loginUser } from "../../Config/Redux/Actions/userActions";
import NotLoggedIn from "./NotLoggedIn.jsx";

function mapDispatchToProp(dispatch) {
  return { loginUser: (username) => dispatch(loginUser(username)) };
}
function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

const NotLoggedInWrapper = connect(mapStateToProps, mapDispatchToProp)(NotLoggedIn);

export default NotLoggedInWrapper;
