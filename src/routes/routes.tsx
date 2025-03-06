import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import Meeting from "@/pages/meeting";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route element={<Meeting />} path="/reuniao" />
      </Switch>
    </BrowserRouter>
  );
}
