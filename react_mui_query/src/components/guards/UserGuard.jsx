import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserGuard = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn && user.role.name) return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default UserGuard;
