import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./context/user-context";
import Routes from "./routes/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <UserProvider>
        <div className="h-screen w-full">
          <Routes />
          <Toaster />
        </div>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
