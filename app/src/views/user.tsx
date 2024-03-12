import Aside from "@/components/aside";
import Sidebar from "@/components/sidebar";
import { UserProfile } from "@/components/user/user-profile";
import { fetchUser } from "@/lib/api";
import { User as UserType } from "@/lib/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function User() {
  const { jhed } = useParams();
  const email = `${jhed}@jhu.edu`; // Construct the email from the jhed parameter

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser(email);
      setUser(userData);
    };

    getUser();
  }, [email]);

  return (
    <>
      <Sidebar isPostsView={false} />
      <div>
        {!user && (
          <div className="flex flex-col w-screen min-h-screen border-x-2 border-slate-400 md:max-w-4xl justify-center items-center font-bold">
            No user found
          </div>
        )}
        {user && <UserProfile user={user} />}
      </div>
      <Aside />
    </>
  );
}

export default User;
