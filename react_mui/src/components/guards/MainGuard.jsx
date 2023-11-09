import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainGuard = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn && user) {
    const role = user.role.name;

    if (role === "administrator") return <Navigate to={"/admin"} />;
    if (role === "quản lý") return <Navigate to={"/manager"} />;
    if (role === "người dùng") return <Navigate to={"/user"} />;
  }

  return <Navigate to={"/login"} />;
};

export default MainGuard;
