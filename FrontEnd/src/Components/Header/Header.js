import { connect } from "react-redux";
import { logoutUser } from "../../Config/Redux/Actions/userActions";
import Header from "./Header.jsx";

function mapStateToProps(state){
  return {isLoggedIn: state.isLoggedIn,
  username: state.username}
}

function mapDispatchToProps(dispatch) {
    return {
      logoutUser: () => dispatch(logoutUser())
    };
  }
  
  const HeaderScreen = connect(mapStateToProps,mapDispatchToProps)(Header)
  
  export default HeaderScreen