import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import Meeting from "@/pages/meeting";
import WhatWeDo from "@/pages/whatwedo";
import ProtectedRoute from "@/components/protected-route";
import Dashboard from "@/pages/dashboard";
import useRole from "@/hooks/auth/use-role";
import FollowUp from "@/pages/follow-up";
import InitialMeeting from "@/pages/initial-meeting";
import Login from "@/pages/login";
import About from "@/pages/about";

export default function Routes() {
  const role = useRole();

  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route element={<Meeting />} path="/reuniao" />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAllowed={role === "admin" || role === "developer"}
            >
              <Dashboard userRole={role as string} />
            </ProtectedRoute>
          }
        />
        <Route element={<FollowUp />} path="/acompanhamento/:id" />
        <Route element={<FollowUp />} path="/acompanhamento/:id/success" />
        <Route element={<InitialMeeting />} path="/agendamento" />
        <Route element={<Login />} path="/auth" />
        <Route element={<About />} path="/about" />
      </Switch>

      <Switch>
        <Route element={<WhatWeDo />} path="/whatwedo"></Route>
      </Switch>
    </BrowserRouter>
  );
}
