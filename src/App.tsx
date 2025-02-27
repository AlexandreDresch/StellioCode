import { UserProvider } from "./context/user-context";
import Routes from "./routes/routes";

function App() {
  return (
    <UserProvider>
      <div className="h-screen w-full">
        <Routes />
      </div>
    </UserProvider>
  );
}

export default App;
