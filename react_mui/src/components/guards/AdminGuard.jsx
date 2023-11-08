import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn && user.role.name === "administrator") return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default AdminGuard;
