import Feed from "./components/catalog/feed";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="flex justify-center min-h-screen">
      <Feed />
      <Toaster />
    </div>
  );
}

export default App;