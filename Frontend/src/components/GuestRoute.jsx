import { Navigate } from "react-router-dom";

const GuestRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default GuestRoute;
