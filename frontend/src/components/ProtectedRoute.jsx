import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
// import Read from "./Read";
export default function ProtectedRoute ({children}){

// const Navigate = useNavigate();
    
        //check if user exists in local storage
          const user = JSON.parse(localStorage.getItem('user'));

        // no user at all, OR a user whose token has expired -> treat as logged out
    if(!user || isTokenExpired(user.token)){
       localStorage.removeItem('user');
            return <Navigate to="/login"/>
        }
        // if user exists, render the home page
        return children;
    

    
}