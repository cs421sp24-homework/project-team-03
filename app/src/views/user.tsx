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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getUser = async () => {
    try {
      const userData = await fetchUser(email);
      setUser(userData);
      setIsLoading(false); // Once data is fetched, set loading to false
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getUser();
  }, [email]);
  

  return (
    <>
      <Sidebar isPostsView={false} />
      <div>
        {isLoading && ( // Display "Loading" if still fetching user data
          <div className="flex flex-col items-center justify-center w-screen min-h-screen font-bold border-x-2 border-slate-400 md:max-w-4xl">
            Loading...
          </div>
        )}
        {!isLoading && !user && ( // If not loading and no user found
          <div className="flex flex-col items-center justify-center w-screen min-h-screen font-bold border-x-2 border-slate-400 md:max-w-4xl">
            No user found
          </div>
        )}
        {!isLoading && user && ( // If not loading and user found
          <UserProfile user={user} />
        )}
      </div>
      <Aside />
    </>
  );
}

export default User;
