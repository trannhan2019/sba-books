import { apiGetCurrentUser } from "@/apis/user";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const res = await apiGetCurrentUser();
      setUser(res.data);
      console.log("get user data", res);
    } catch (error) {
      console.log("get user error", error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(user);
  }, []);
  return (
    <div>
      <p>{user?.name}</p>
      {/* <p>{user?.roles[0]?.name}</p> */}
    </div>
  );
};

export default User;
