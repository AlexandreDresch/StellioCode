import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import WhatWeDo from "@/pages/whatwedo";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
      </Switch>

      <Switch>
        <Route element={<WhatWeDo />} path="/whatwedo"></Route>
      </Switch>
    </BrowserRouter>
  );
}
