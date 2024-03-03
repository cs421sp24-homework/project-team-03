import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useToast } from "./components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUserToken, isTokenExpired, removeAuthenticatedUserToken } from "./lib/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "./views/main-view";
import ErrorPage from "./views/error-page";
import User from "./views/user";
import PostView from "./views/post-view";
import HousingView from "./views/housing-view";
// import Feed from "./components/catalog/feed";

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();


  const router = createBrowserRouter([
    {
      path: "/project-team-03/",
      element: <MainView />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/project-team-03/users/:jhed",
      element: <User />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/project-team-03/posts",
      element: <PostView />,
      errorElement: <ErrorPage />
    },
    {
      path: "/project-team-03/housings/:id",
      element: <HousingView />,
      errorElement: <ErrorPage />
    }
  ]);
  

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
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;