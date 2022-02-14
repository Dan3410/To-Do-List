import { Navigate } from "react-router";

function NotLoggedIn(props){
    if (!props.isLoggedIn)
        return props.element
    else
        return <Navigate to={"/toDos/"} replace />
}

export default NotLoggedIn;