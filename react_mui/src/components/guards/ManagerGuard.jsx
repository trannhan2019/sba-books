import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ManagerGuard = ({ children }) => {
  let token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);

  if (
    (token && user.role.name === "quản lý") ||
    (token && user.role.name === "administrator")
  )
    return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default ManagerGuard;
