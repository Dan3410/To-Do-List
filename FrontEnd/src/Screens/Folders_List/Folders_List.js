import { connect } from "react-redux";
import Folder_List from "./Folders_List.jsx";

function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

const FolderListScreen = connect(mapStateToProps, null)(Folder_List);

export default FolderListScreen;
