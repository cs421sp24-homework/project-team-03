import { clearNotifs, editUser, login, logout, register } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUser } from "@/lib/auth";

function useMutationUser() {
  const { toast } = useToast();
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);
  const setEditUser = useStore((state) => state.setEditUser);
  const setNotifs = useStore((state) => state.userNotificationCount);

  const loginUser = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
      setUser(user);
      setNotifs(user.notifications);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };


  const logoutUser = async () => {
    try {
      await logout();
      clearUser();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description:
          (error as Error).message ||
          "There was an error signing you out. Please try again later.",
      });
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar?: string,
  ) => {
    try {
      await register(email, password, firstName, lastName, avatar);
      toast({
        variant: "default",
        title: "Registration successful",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (error as Error).message ||
          "There was an error registering you. Please try again later.",
      });
    }
  };

  const editUsers = async (
    id: number,
    firstName?: string,
    lastName?: string,
    avatar?: string,
    bio?: string,
  ) => {
    try {
      const editedUser = await editUser( id, firstName, lastName, avatar, bio );
      setEditUser(editedUser);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit profile",
        description:
          (error as Error).message ||
          "There was an error editing your profile. Please try again later.",
      });
    }
  };

  const clearNotif = async (
    email: string,
  ) => {
  try {
    const clearedUser = await clearNotifs(email);
    setNotifs(0);
    setEditUser(clearedUser);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Failed to edit profile",
      description:
        (error as Error).message ||
        "There was an error editing your profile. Please try again later.",
    });
  }
};


    useEffect(() => {
    try {
      const user = getAuthenticatedUser();
      setUser(user);
    } catch (error) {
      clearUser();
    }
  }, []);

  return { loginUser, logoutUser, registerUser, editUsers, clearNotif };
}

export default useMutationUser;
