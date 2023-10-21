import React, { useEffect, useState } from "react";
import UserProfile from "./MenuProfile";
import LogoutDialog from "../LogoutDialog";
import LogoutButton from "../LogoutButton";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [Logout, setLogout] = useState(false);

  const LogoutFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("data :" + data);
        } else {
          console.error("User data retrieval failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <UserProfile>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          Loading...
        </div>
      </UserProfile>
    );
  }

  return (
    <UserProfile>
      <div>
        <h2>User Profile</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
      <LogoutButton onClick={() => setLogout(true)} />
      <LogoutDialog
        open={Logout}
        onClose={() => setLogout(false)}
        // handleSubmit={handleSubmit}
        LoginFinish={LogoutFinish}
      />
    </UserProfile>
  );
};

export default Profile;
