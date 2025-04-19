import {Navigate, Outlet} from "react-router-dom"
import { isAuthenticated } from "../helpers/authLogin"

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet/> : <Navigate to="/login"/>;
}
export default PrivateRoute