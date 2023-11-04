import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Admin from "./admin";
import Manager from "./manager";
import User from "./user";

const WrapProtect = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  // token = JSON.parse(token);
  const { user } = useSelector((state) => state.user);

  if (token && user) {
    const role = user.role.name;

    if (role === "administrator") return <Admin />;
    if (role === "quản lý") return <Manager />;
    if (role === "người dùng") return <User />;
  }

  return <Navigate to={"/login"} />;
};

export default WrapProtect;
