import { Navigate } from "react-router-dom"

const Protected = ({children}) => {
    const storedValue = window.localStorage.getItem('user');
    const userData = JSON.parse(storedValue);
  if (!(userData?._id)) {
    console.log("Redirecting to login page...");
    return <Navigate to="/login" replace={true} />;
  }

  console.log("Rendering protected content...");
  return children;
}

export default Protected