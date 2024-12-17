import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import ProtectedRoute from "@/components/protected-route";
import Dashboard from "@/pages/dashboard";

export default function Routes() {
  const user = { role: "admin" };

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAllowed={user.role === "admin" || user.role === "dev"}
            >
              <Dashboard userRole={user.role} />
            </ProtectedRoute>
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
