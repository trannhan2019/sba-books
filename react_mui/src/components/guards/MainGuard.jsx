import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainGuard = () => {
  let token = localStorage.getItem("token");
  // token = JSON.parse(token);
  const { user } = useSelector((state) => state.user);

  if (token && user) {
    const role = user.role.name;

    if (role === "administrator") return <Navigate to={"/admin"} />;
    if (role === "quản lý") return <Navigate to={"/manager"} />;
    if (role === "người dùng") return <Navigate to={"/user"} />;
  }

  return <Navigate to={"/login"} />;
};

export default MainGuard;
