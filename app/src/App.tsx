import Aside from "./aside";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useEffect } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

    useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);
  return (
    <div className="flex justify-center min-h-screen">
       <div className="flex flex-col gap-2 p-4">
        <Aside />
       </div>
      <Toaster />
    </div>
  );
}

export default App;
