import { Toaster } from "sonner";
import Routes from "./routes/routes";

function App() {
  return (
    <div className="h-screen w-full">
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
