import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Admin from "./admin";
import Manager from "./manager";
import User from "./user";

const WrapProtect = () => {
  const { user } = useSelector((state) => state.user);

  if (user) {
    const role = user.roles[0].name;

    if (role === "administrator") return <Admin />;
    if (role === "manager") return <Manager />;
    if (role === "user") return <User />;
  }

  return <Navigate to={"/login"} />;
};

export default WrapProtect;
