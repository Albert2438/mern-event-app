import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

// This is the mirror image of ProtectedRoute:
// ProtectedRoute says "no user -> force to /login"
// This one says   "user exists -> force away from /login"

export default function RedirectIfAuth({ children }) {

  // same check as ProtectedRoute - read the user out of localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // THE FLIP: instead of `if (!user)`, we check `if (user)`.
  // If someone is already logged in and manually types /login
  // in the address bar, we redirect them to /home instead of
  // letting the Login form render.
if (user && !isTokenExpired(user.token)) {
    return <Navigate to="/home" />;
  }

  // no user logged in -> it's fine to show whatever was passed in
  // (Login or Signup), same as ProtectedRoute returning `children`
  return children;
}