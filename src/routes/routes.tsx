import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import Home from "@/pages/home";
import About from "@/pages/about";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
      </Switch>
    </BrowserRouter>
  );
}
