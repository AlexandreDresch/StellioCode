import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import ProtectedRoute from "@/components/protected-route";
import Dashboard from "@/pages/dashboard";
import useRole from "@/hooks/auth/use-role";

export default function Routes() {
  const role = useRole();

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={role === "admin" || role === "dev"}>
              <Dashboard userRole={role as string} />
            </ProtectedRoute>
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
