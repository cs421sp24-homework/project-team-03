import Aside from "@/components/aside";
import Sidebar from "@/components/sidebar";
import { fetchUser } from "@/lib/api";
import { User as UserType} from "@/lib/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const { jhed } = useParams();
  const email = `${jhed}@jhu.edu`; // Construct the email from the jhed parameter

  const [user, setUser] = useState<UserType | null>(null); // Specify the User type or null

  useEffect(() => {
    const getUser = async () => {

        const userData = await fetchUser(email); // Call fetchUser function with email
        setUser(userData); // Set user data in state
      
    };

    getUser();
  }, [email]); // Fetch user data whenever email changes


  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <><Sidebar isPostsView={false}/><div>
      <h2>User details for {jhed}</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Avatar: {user.avatar}</p>
    </div>
    <Aside />
    </>
  );
}

export default User;
