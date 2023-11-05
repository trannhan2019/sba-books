import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  let token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);

  if (token && user.role.name === "administrator") return <>{children}</>;
  return <Navigate to={"/"} />;
};

export default AdminGuard;
