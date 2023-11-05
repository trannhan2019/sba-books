import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserGuard = ({ children }) => {
  let token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);

  if (token && user.role.name) return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default UserGuard;
