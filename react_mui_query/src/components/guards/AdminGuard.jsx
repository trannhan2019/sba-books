import { useSelector } from "react-redux";

const AdminGuard = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn && user.role.name === "administrator") return <>{children}</>;
};

export default AdminGuard;
