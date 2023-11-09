import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ManagerGuard = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (
    (isLoggedIn && user.role.name === "quản lý") ||
    (isLoggedIn && user.role.name === "administrator")
  )
    return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default ManagerGuard;
